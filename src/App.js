import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Board from './components/Board';
import CardForm from './components/CardForm';
import ColumnForm from './components/ColumnForm';
import Register from './components/Register';
import Login from './components/Login';



import { Switch, Route} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
      <div className='body'></div>
        <Header />
        <Switch>
          <Route exact path="/" component={Board} />
          <Route exact path="/new-card" component={CardForm} />
          <Route exact path="/auth/register" component={Register} />
          <Route exact path="/auth/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
