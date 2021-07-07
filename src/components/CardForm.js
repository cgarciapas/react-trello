import React, { Component, Fragment } from 'react';
import { newCard } from '../services/TrelloService';
import { Redirect, Link } from 'react-router-dom';
import Board from './Board';
export default class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {
        title: '',
        description: '',
        imageUrl: ''
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
    const {name} = e.target;

    if(e.target.files){
      this.setState({
        card : {
          ...this.state.card,
          [name]: e.target.value,
          imageUrl : e.target.files ? e.target.files[0] : e.target.value,
        }
      })
    } else {
      this.setState({
        card : {
          ...this.state.card,
          [name]: e.target.value,
        }
      })
    }
  }

  render() {
    if (this.state.onSubmit) {
      return (
      <Redirect to='/' />
      )} else {
    return (
      <Fragment>
        < Board />
        <div className='body-black'></div>
        <div className='absolute-form'>
        <form onSubmit={this.handleSubmit}>
        <div className='text-right'> <Link to='/'><i data-id={this.props.id} class="fas fa-times mr-2" onClick={this.props.deleteColumn}></i></Link></div>
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
      <div className="form-group">
      <label>Add image</label>
      <div class="custom-file">
        <input type="file" class="custom-file-input" id="customFile" name='imageUrl'
        onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-primary w-100 mt-3 mb-4">Submit</button>
        {this.state.card.imageUrl && 
        
        <div class='image-div'>
           <img src={URL.createObjectURL(this.state.card.imageUrl)} className='image-form-card' alt='preview'></img>
        </div>
        
        
        }  
        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
      </div>
      </div>
    </form>
    </div>
    </Fragment>
    );
  }
}
}


