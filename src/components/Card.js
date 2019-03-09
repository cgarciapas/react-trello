import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
  
    }
  }

  render() {
    return (
      <div className="w-100 p-2">
        <p>{this.props.title}</p>
      </div>
    );
  }
}