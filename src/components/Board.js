import React, { Component } from 'react';
import Column from './Column';
import { columns, deleteColumn } from '../services/TrelloService';
import ColumnForm from './ColumnForm';

export default class Board extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        columns: []
      }
    }

  getColumns = () => {
    columns()
    .then(columns => {
      this.setState({
        columns: columns.data
      })
    })
  }

  delete = (e) => {
    const id = e.target.dataset.id
    deleteColumn(id)
    .then(column => {
      this.getColumns()
    },
      (error) => console.log(error.response.data)
    )
  }

  componentDidMount = () => {
    this.getColumns();
  }

  widthColumns = () => {
    return 300 * (this.state.columns.length +1)
  }

  renderColumns = () => (
    this.state.columns.map((column, index) => {
      return <Column deleteColumn={this.delete} {...column} key={Math.random()}/>
    })
  )

  render() {
    return (
      <div className="section trello-section" style={{'width':this.widthColumns()}}>
        <div className="container-fluid">
          <div className="row">
            {this.renderColumns()}
            <ColumnForm currentPosition={(this.state.columns.length)+1} refresh = {this.getColumns} />
          </div>
        </div>
      </div>
    );
  }
}