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
    console.log(this.props.currentPosition )
    e.preventDefault()
    newColumn({ ...this.state.column, position: this.props.currentPosition })
    .then(data => 
      this.props.refresh()
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
    return (
      <div>
      
    <form onSubmit={this.handleSubmit} className=' row  form-col'>
    <h5 className='text-white p-0 m-0 d-none d-lg-block d-md-block'><strong>New</strong> Column</h5>
      <div className=" col-xl-2 col-md-3 col-5 w-100">
        <input
          type="text"
          name='title'
          className="form-control"
          placeholder="Column title"
          value={this.state.column.title}
          onChange={this.handleChange}/>
      </div> 
      <div className=" col-xl-2 col-md-3 col-5 pl-0">
        <input
          type="text"
          name='description'
          className="form-control "
          placeholder="Column description"
          value={this.state.column.description}
          onChange={this.handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary "> <i data-id={this.props.id} class="fas fa-plus" onClick={this.props.deleteColumn}></i></button>
    </form>
    </div>
    );
  }
}


