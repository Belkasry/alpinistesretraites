import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  gridRowCountSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import axios from 'axios';
import { dateFormat, convertoperator, getParameterByName } from '../../lib/utils.js';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Pagination, Stack, Chip, GlobalStyles, Button, IconButton, Switch, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { red } from '@mui/material/colors';
import { Block } from '@mui/icons-material';
import LoupeIcon from '@mui/icons-material/Loupe';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwitchState from './Composants/SwitchState.jsx';
import { async } from 'regenerator-runtime';
import { messageService } from '../../_services/AlertToast.js';


class ExperiencesGridTable extends React.Component {
  constructor(props) {

    super(props);
    const renderActionButton = (params) => {
      return this.actionButtons(params)
    };

    this.state = {
      page: 0,
      count: 1,
      rowsPerPage: 5,
      rows: [],
      isLoading: false,
      columns: [
        {
          field: 'id',
          headerName: 'Identifiant', flex: 1
        },
        {
          field: 'title',
          headerName: 'Titre', flex: 2
        },
        {
          field: 'dificulte',
          headerName: 'Difficulté',
          type: "number", flex: 0.5,
          valueGetter: (params) =>
            `${params.row.dificulte || ''} /5`,
        }, {
          field: 'nbr_participant',
          headerName: 'Nombre de Participants',
          type: "number", flex: 0.5
        }, {
          field: 'prix',
          headerName: 'Prix',
          type: "number", flex: 1
        }, {
          field: 'etat',
          headerName: 'Etat',
          editable: true,
          type: "boolean",
          flex: 1,
          renderCell: (params) => <SwitchState id={params.row.id} etat={params.row.etat} />
        },
        {
          field: 'start',
          headerName: 'Date de début - Date de fin',
          flex: 2,
          type: "date",
          valueGetter: (params) =>
            `${dateFormat(params.row.start) || ''} - ${dateFormat(params.row.finish) || ''}`,
        },
        {
          field: 'destination',
          headerName: 'Destination', flex: 1
        }, {
          field: 'duree',
          headerName: 'Durèe',
          type: "number", flex: 0.5,
          valueGetter: (params) =>
            `${params.row.duree || ''} jour`,
        }, {
          field: 'createdAt',
          headerName: 'Date de création',
          flex: 1,
          valueGetter: (params) =>
            `${dateFormat(params.row.createdAt, "avecheure") || ''}`,
        }, {
          field: 'actions',
          sortable: false,
          headerName: 'Actions',
          flex: 1,
          renderCell: renderActionButton,
        },


      ],
      sortModel: [{
        field: 'createdAt',
        sort: 'desc'
      },],
      filterModel: {
        items: [
          { columnField: "id", id: 93654, operatorValue: "!=", value: "0" }
        ],
        linkOperator: "and"
      },
      openConfirm: false,
      id_action_row: null,
      actionOnRow: "",


    };


  }
  sendMessage(message, type) {
    // send message to subscribers via observable subject
    messageService.sendMessage(message, type);
  }

  clearMessages() {
    messageService.clearMessages();
  }



  actionButtons(params) {
    return (
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-start"
        alignItems="baseline">
        <IconButton aria-label="detail"
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            this.setState({ openConfirm: true, actionOnRow: "edit", id_action_row: params.row.id })
          }}
        >
          <LoupeIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete"
          variant="contained"
          color="warning"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            this.setState({ openConfirm: true, actionOnRow: "delete", id_action_row: params.row.id })
          }}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit"
          variant="contained"
          color="info"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            alert(params.row.id)
          }}
        >
          <EditIcon />
        </IconButton>
      </Stack>
    )
  }
  componentWillMount() {
    this.setState({
      sortModel: [{
        field: 'createdAt',
        sort: 'desc'
      },]
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData(0);
  }

  sort = (model) => {
    this.setState({ isLoading: true, page: 0 });
    this.xhrRequest(0, model);

  };

  filter = (filter) => {
    this.setState({ isLoading: true, page: 0 });
    this.xhrRequest(0, {}, filter);

  };

  changepage = (page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(page);
  };

  xhrRequest = async (lpage, lsortModel = {}, lfilterModel = { items: [] }) => {
    try {
      console.log("------------" + lpage);
      // if (lpage == 0) {
      //   lpage = 1;
      // }
      if (jQuery.isEmptyObject(lsortModel)) {
        lsortModel = this.state.sortModel[0];
      }
      if (jQuery.isEmptyObject(lfilterModel) || lfilterModel.items.length < 1) {
        lfilterModel = this.state.filterModel;
      }

      let token = "";
      const instance = axios.create({
        baseURL: window.location.origin,
        headers: { 'Authorization': 'Bearer ' + token }
      });

      // { columnField: "dificulte", id: 93654, operatorValue: ">=", value: "4" }
      let filtres = [];
      let url_ext = "";
      lfilterModel.items.forEach(element => {
        url_ext += element.columnField + "[" + convertoperator(element.operatorValue) + "]=" + element.value + "&";
      });
      url_ext = url_ext.slice(0, -1);





      const response = await instance.get(
        `rest/experiences?${url_ext}`, { params: { page: (lpage + 1), sort_by: lsortModel.field, order_by: lsortModel.sort } }
      );
      this.setState(
        {
          rows: response.data.data,
          page: lpage,
          isLoading: false,
          count: response.data.total,
        });
    } catch (error) {
      console.log(error);
    } finally {
    }

  };

  getData = async (page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(page);
  };

  deleteRow = async (id_row) => {
    var array = [...this.state.rows]; // make a separate copy of the array
    var index = (this.state.rows.findIndex(x => x.id == id_row));
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ rows: array });
    }
    const headers = {};
    let token = "";
    const instance = axios.create({
      baseURL: window.location.origin,
      headers: { 'Authorization': 'Bearer ' + token }
    });
    let self = this;
    instance.delete('rest/experiences/' + id_row, { headers })
      .then((response) => self.sendMessage(response.data.message, "warning"))
      .then(this.getData(this.state.page));

  }

  handleCloseConfirm = () => {
    this.setState({ openConfirm: false })
  }

  handleYesDialog = () => {
    switch (this.state.actionOnRow) {
      case "delete":
        this.deleteRow(this.state.id_action_row);
        this.setState({ openConfirm: false })
        break;
      case "edit":
        alert(this.state.id_action_row);
        break;
      default:
        break;
    }
  }


  CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const totalCount = useGridSelector(apiRef, gridRowCountSelector);

    return (
      <Stack
        direction="row"
        justifyContent="space-around"
        spacing={2}>
        <Chip variant="outlined" color="secondary" label={"Total elements : " + totalCount} />
        <Pagination
          color="secondary"
          count={pageCount}
          page={page + 1}
          variant="outlined"
          shape="rounded"
          onChange={(event, value) => { apiRef.current.setPage(value - 1) }}
        />
      </Stack>

    );
  }




  render() {
    const { page, count, isLoading, rowsPerPage, rows, columns, sortModel, openConfirm, message_alert } = this.state;

    return (
      <div style={{ height: 400, width: '100%' }}>

        <GlobalStyles
          styles={{
            ".new-row": {
              border: "1px #5cb660 solid",
              animation: 'blink 2s',
              animationIterationCount: 10
            },
            "@keyframes blink": {
              "50%": {
                borderColor: '#fff'
              }
            }
          }}
        />
        <Dialog
          open={openConfirm}
          onClose={this.handleCloseConfirm}>
          <DialogTitle id="alert-dialog-title">
            {"Etes vous sure ?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseConfirm}>Disagree</Button>
            <Button onClick={this.handleYesDialog} autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
        <DataGrid
          getRowClassName={(params) =>
            params.id == getParameterByName('newid') ? 'new-row' : ''
          }
          rowCount={parseInt(count, 10)}
          rows={rows}
          columns={columns}
          page={page}
          onPageChange={(p) => {
            this.setState({ page: p });
            this.changepage(p);
          }}
          pageSize={rowsPerPage}
          checkboxSelection
          disableSelectionOnClick
          loading={isLoading}
          paginationMode="server"
          onPageSizeChange={(pageSize) =>
            setRowsState((prev) => ({ ...prev, pageSize }))
          }
          components={{
            Pagination: this.CustomPagination,
          }}

          sortModel={sortModel}
          onSortModelChange={(model) => {
            this.setState({ sortModel: model });
            this.sort(model[0]);
          }}

          filterMode="server"
          onFilterModelChange={(filter) => {
            this.setState({ filterModel: filter });
            this.filter(filter);
            // console.log(convertoperator(filter.items[0].operatorValue));
          }}

        />

      </div>
    );
  }
}
export default ExperiencesGridTable;