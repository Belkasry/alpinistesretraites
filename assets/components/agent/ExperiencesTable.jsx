import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables";
import axios from 'axios';



class ExperiencesTable extends React.Component {

  state = {
    page: 0,
    count: 1,
    rowsPerPage: 5,
    sortOrder: {},
    data: [['Loading Data...']],
    columns: [
      {
        name: 'id',
        label: 'Identifiant',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            // console.log('customBodyRender');
            console.dir(tableMeta);
            return value;
          },
          filter: true,
          customFilterListRender: v => `Titre: ${v}`,
          filterType: "textField"
        },
      },
      {
        name: 'title',
        label: 'Titre',
        options: {
          filter: true,
          customFilterListRender: v => `Titre: ${v}`,
          filterType: "textField"
        },
      },
      {
        name: 'dificulte',
        label: 'Difficulté',
        options: {
          filter: false
        },
      }, {
        name: 'nbr_participant',
        label: 'Nombre de Participants',
        options: {
          filter: true,
          customFilterListRender: v => `Nbr Participant: ${v}`,
          filterType: "textField"
        },
      }, {
        name: 'prix',
        label: 'Prix',
        options: {
          filter: true,
          customFilterListRender: v => `Prix: ${v}`,
          filterType: "textField"
        },
      }, {
        name: 'etat',
        label: 'Etat',
        options: {},
      }, {
        name: 'start',
        label: 'Date de début',
        options: {},
      }, {
        name: 'finish',
        label: 'Date de fin',
        options: {},
      },
      {
        name: 'destination',
        label: 'Date de fin',
        options: {},
      }, {
        name: 'duree',
        label: 'Durèe',
        options: {},
      },

    ],
    isLoading: false,
  };
  // "id": 25,
  // "title": "AKIOUD EXPERIENCE",
  // "dificulte": 4,
  // "nbr_participant": null,
  // "prix": "1200",
  // "etat": true,
  // "start": "2021-03-12T00:00:00+01:00",
  // "finish": "2021-03-13T00:00:00+01:00",
  // "destination": "/api/destinations/1",
  // "duree": 2


  componentDidMount() {
    this.getData('https://127.0.0.1:8000/', 0);
  }

  // get data
  getData = async (url, page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(url, page);
  };


  sort = (page, sortOrder) => {
    this.setState({ isLoading: true });
    this.xhrRequest('https://127.0.0.1:8000/', page, sortOrder);
  };


  xhrRequest = async (lurl, lpage, lsortOrder = {}) => {
    try {
      // let sort_by = lsortOrder.name;
      // let order_by = lsortOrder.direction;
      //  let token= cookies.get('token');
      let token = "";
      const instance = axios.create({
        baseURL: lurl,
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const response = await instance.get(
        `rest/experiences`, { params: { page: (lpage + 1), sort_by: lsortOrder.name, order_by: lsortOrder.direction } }
      );
      console.log(response.data.data);
      this.setState(
        {
          data: response.data.data,
          page: lpage,
          sortOrder: lsortOrder,
          isLoading: false,
          count: response.data.total,
        });

      /////////////////////////////////////////////////////////////


    } catch (error) {
      console.log(error);
    } finally {
    }

  };



  changePage = (page, sortOrder) => {
    this.setState({
      isLoading: true,
    });
    this.xhrRequest('https://127.0.0.1:8000/', page, sortOrder);
  };

  render() {
    const { data, page, count, isLoading, rowsPerPage, sortOrder } = this.state;

    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'vertical',
      serverSide: true,
      count: count,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [],
      sortOrder: sortOrder,
      onTableChange: (action, tableState) => {
        // console.log(action, tableState);

        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page, tableState.sortOrder);
            break;
          case 'sort':
            this.sort(tableState.page, tableState.sortOrder);
            break;
          default:
          // console.log('action not handled.');
        }
      },
    };

    // console.log('COLUMNS');
    // console.dir(JSON.parse(JSON.stringify(this.state.columns)));
    const filterModel = {
      columnField: 'nbr_participant',
      operatorValue: '>',
      value: '2.5',
    };
    return (

      <div>
        <MUIDataTable
          title={
            <Typography variant="h6">
              ACME Employee list
              {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
          }
          filterModel={filterModel}
          data={data}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

export default ExperiencesTable;