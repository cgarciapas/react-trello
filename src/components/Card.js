import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
  
    }
  }

  render() {
    return (

      
      <div className="w-100 card">
      <div className="w-100 delete-head-card"><i data-id={this.props.id} class="fas fa-times mr-2 f-1" onClick={this.props.deleteCard}></i></div>
        <img src={this.props.imageUrl} className='image-card'></img>
        <p>{this.props.title}</p>
      </div>
    );
  }
}