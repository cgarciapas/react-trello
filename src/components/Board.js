import React, { Component } from 'react';
import Column from './Column';
import { columns } from '../services/TrelloService';
import ColumnForm from './ColumnForm';


export default class Board extends Component {

  getColumns = ()=> {
    columns()
    .then(columns => {
      console.log(columns.data);
      this.setState({columns: columns.data})
    })
  }

  componentDidMount = () => {
    this.getColumns();
  }

  constructor(props) {
    super(props);

    this.state = {
      columns: []
    }
  }

  render() {
    const columns = this.state.columns.map((column, index) => {
      return <Column {...column} key={index}/>
    })

    return (
      <div className="section">
        <div className="container-fluid">
          <div className="row">
            {columns}
            <ColumnForm currentPosition={(this.state.columns.length)+1} refresh = {this.getColumns} />
          </div>
        </div>
      </div>
    );
  }
}