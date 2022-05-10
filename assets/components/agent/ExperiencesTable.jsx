import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import MUIDataTable from "mui-datatables"; import axios from 'axios';
;

class ExperiencesTable extends React.Component {

  state = {
    page: 1,
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
        },
      },
      {
        name: 'title',
        label: 'Titre',
        options: {},
      },
      {
        name: 'dificulte',
        label: 'Difficulté',
        options: {},
      }, {
        name: 'nbr_participant',
        label: 'Nombre de Participants',
        options: {},
      }, {
        name: 'prix',
        label: 'Prix',
        options: {},
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
    this.getData('https://127.0.0.1:8000/', 1);
  }

  // get data
  getData = async (url, page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(url, page);
  };

  getSrcData = () => {
    return [
      { fullName: 'Gabby George', title: 'Business Analyst', location: 'Minneapolis' },
      { fullName: 'Aiden Lloyd', title: 'Business Consultant', location: 'Dallas' },
      { fullName: 'Jaden Collins', title: 'Attorney', location: 'Santa Ana' },
      { fullName: 'Franky Rees', title: 'Business Analyst', location: 'St. Petersburg' },
      { fullName: 'Aaren Rose', title: 'Business Analyst', location: 'Toledo' },

      { fullName: 'John George', title: 'Business Analyst', location: 'Washington DC' },
      { fullName: 'Pat Lloyd', title: 'Computer Programmer', location: 'Baltimore' },
      { fullName: 'Joe Joe Collins', title: 'Attorney', location: 'Las Cruces' },
      { fullName: 'Franky Hershy', title: 'Paper Boy', location: 'El Paso' },
      { fullName: 'Aaren Smalls', title: 'Business Analyst', location: 'Tokyo' },

      { fullName: 'Boogie G', title: 'Police Officer', location: 'Unknown' },
      { fullName: 'James Roulf', title: 'Business Consultant', location: 'Video Game Land' },
      { fullName: 'Mike Moocow', title: 'Burger King Employee', location: 'New York' },
      { fullName: 'Mimi Gerock', title: 'Business Analyst', location: 'McCloud' },
      { fullName: 'Jason Evans', title: 'Business Analyst', location: 'Mt Shasta' },

      { fullName: 'Simple Sam', title: 'Business Analyst', location: 'Mt Shasta' },
      { fullName: 'Marky Mark', title: 'Business Consultant', location: 'Las Cruces' },
      { fullName: 'Jaden Jam', title: 'Attorney', location: 'El Paso' },
      { fullName: 'Holly Jo', title: 'Business Analyst', location: 'St. Petersburg' },
      { fullName: 'Suzie Q', title: 'Business Analyst', location: 'New York' },
    ];
  };

  sort = (page, sortOrder) => {
    this.setState({ isLoading: true });
    this.xhrRequest('https://127.0.0.1:8000/', 1, sortOrder);
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
        `rest/experiences?page${lpage}`, { params: { page: lpage, sort_by: lsortOrder.name, order_by: lsortOrder.direction } }
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
    this.xhrRequest(`/rest/experiences?page=${page}`, page, sortOrder).then(res => {
      this.setState({
        isLoading: false,
        page: res.page,
        sortOrder,
        data: res.data,
        count: res.total,
      });
    });
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

    return (
      <div>
        <MUIDataTable
          title={
            <Typography variant="h6">
              ACME Employee list
              {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
          }
          data={data}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

export default ExperiencesTable;