import React, { Component } from 'react';
import { newColumn } from '../services/TrelloService';

export default class ColumnForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: {
        title: '',
        description: ''
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    newColumn({ ...this.state.column, position: this.props.currentPosition })
    .then(data => 
      this.props.refresh(),
      (error) => console.log(error.response.data)
    )
  }

  handleChange = (e) => {
    this.setState({
      column : {
        ...this.state.column,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    console.log(this.props.currentPosition);
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name='title'
          className="form-control"
          placeholder="Enter title"
          value={this.state.column.title}
          onChange={this.handleChange}/>
      </div> 
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name='description'
          className="form-control"
          placeholder="Enter description"
          value={this.state.column.description}
          onChange={this.handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    );
  }
}


