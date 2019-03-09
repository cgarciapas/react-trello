import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import CardForm from './components/CardForm';
import { Switch, Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
         <Route exact path="/" component={Board} />
         <Route exact path="/new-card" component={CardForm} />
        </Switch>
      </div>
    );
  }
}

export default App;
