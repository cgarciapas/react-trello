import React, { Component, Fragment } from 'react';
import { newCard } from '../services/TrelloService';
import { Redirect } from 'react-router-dom';
import Board from './Board';
export default class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {
        title: '',
        description: ''
      },
      onSubmit: false
    }
  }
  

  handleSubmit = (e) => {
    e.preventDefault()
    newCard({ ...this.state.card, ...this.props.location.state })
    .then(data => this.setState({
      onSubmit: true
    }),
      (error) => console.log(error.response.data)
    )
  }

  handleChange = (e) => {
    this.setState({
      card : {
        ...this.state.card,
        [e.target.name]: e.target.value
      }
    })
  }

  render() {
    if (this.state.onSubmit) {
      return (
      <Redirect to='/' />
      )} else {
    return (
      <Fragment>
        < Board />
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name='title'
          className="form-control"
          placeholder="Enter title"
          value={this.state.card.title}
          onChange={this.handleChange}/>
      </div> 
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name='description'
          className="form-control"
          placeholder="Enter description"
          value={this.state.card.description}
          onChange={this.handleChange}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </Fragment>
    );
  }
}
}


