import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';


export default class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.cards
    }
  }


  render() {
    const cards = this.state.cards.map((card, index) => {
      return <Card {...card} key={index} />
    })
    return (
      <div className="col-3 bg-primary p-2">
        <h4>{this.props.title}</h4>
        {cards}
        <Link to="/new-card">Add New Card</Link>
      </div>
    );
  }
}