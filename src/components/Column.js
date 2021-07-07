import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import {deleteCard } from '../services/TrelloService';


export default class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.cards
    }
  }

  delete = (e) => {
    const id = e.target.dataset.id
    deleteCard(id)
      .then(card => {
        this.setState({
          cards: this.state.cards.filter(c => c.id !== id)
        })
      },
      (error => console.log(error)))
  }

  cardsList = () => (
      this.state.cards.map((card, index) => {
        return <Card deleteCard={this.delete} id={card.id} {...card} key={index} />
      }).reverse()  
  )

  render() {
    return (
        <div className="w-costum p-2 column">
          <div className="rend-flex">
          <h4 className='ml-2'>{this.props.title}</h4>
          <i data-id={this.props.id} class="fas fa-times mr-2" onClick={this.props.deleteColumn}></i>
          </div>
        <div className='over-flow-card'>
        {this.cardsList()}
            <Link to={{pathname: "/new-card", state: {position: (this.state.cards.length) + 1, column:this.props.id}}}>Add New Card</Link>
        </div>
        </div>
    );
  }
}