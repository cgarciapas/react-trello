import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Board />
      </div>
    );
  }
}

export default App;
