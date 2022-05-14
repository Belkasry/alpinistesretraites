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
import { dateFormat, convertoperator } from '../../lib/utils.js';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography, Pagination, Stack, Chip } from '@mui/material';



class ExperiencesGridTable extends React.Component {
  constructor(props) {
    super(props)
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
          headerName: 'Titre', flex: 1
        },
        {
          field: 'dificulte',
          headerName: 'Difficulté',
          type: "number", flex: 1,
          valueGetter: (params) =>
            `${params.row.dificulte || ''} /5`,
        }, {
          field: 'nbr_participant',
          headerName: 'Nombre de Participants',
          type: "number", flex: 1
        }, {
          field: 'prix',
          headerName: 'Prix',
          type: "number", flex: 1
        }, {
          field: 'etat',
          headerName: 'Etat',
          type: "boolean",
          flex: 1
        }, {
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
          type: "number", flex: 1,
          valueGetter: (params) =>
            `${params.row.duree || ''} jour`,
        },


      ],
      sortModel: [{
        field: 'id',
        sort: 'desc'
      },], filterModel: {
        items: [
          { columnField: "id", id: 93654, operatorValue: "!=", value: "0" }
        ],
        linkOperator: "and"
      }
    };

  }


  componentWillMount() {
    this.setState({
      sortModel: [{
        field: 'id',
        sort: 'asc'
      },]
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData('https://127.0.0.1:8000/', 0);
  }

  sort = (model) => {
    this.setState({ isLoading: true, page: 0 });
    this.xhrRequest('https://127.0.0.1:8000/', 0, model);

  };

  filter = (filter) => {
    this.setState({ isLoading: true, page: 0 });
    this.xhrRequest('https://127.0.0.1:8000/', 0, {}, filter);

  };

  changepage = (page) => {
    this.setState({ isLoading: true });
    this.xhrRequest('https://127.0.0.1:8000/', page);
  };

  xhrRequest = async (lurl, lpage, lsortModel = {}, lfilterModel = { items: [] }) => {
    try {
      console.log("------------"+lpage);
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
        baseURL: lurl,
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
        `rest/experiences?${url_ext}`, { params: { page: (lpage+1), sort_by: lsortModel.field, order_by: lsortModel.sort } }
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

  getData = async (url, page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(url, page);
  };


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
          onChange={(event, value) => { apiRef.current.setPage(value-1) }}
        />
      </Stack>

    );
  }

  render() {
    const { page, count, isLoading, rowsPerPage, rows, columns, sortModel } = this.state;

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
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