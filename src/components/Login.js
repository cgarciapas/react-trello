import React, { Component, Fragment } from 'react'
import authService from '../services/AuthService';
import { Redirect, Link } from 'react-router-dom';

export default class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    touch: {},
    authenticated: false
  }

  onSubmit = (event) => {
    event.preventDefault();
      authService.authenticate(this.state.user)
      .then(user=> this.setState({ authenticated: true }, () => console.log(user))
      )
    
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  
  render() {
    const { touch, errors, user } = this.state;

    if (this.state.authenticated) {
      return (
      <Redirect to='/' />
      )} else {
    return (
      <Fragment>
        <div className='body-black'></div>
        <div className='body'></div>
      <div className='row'>
        <div className='absolute-form form-intro '>

        <h2 className='text-info pb-3 pt-3'><strong>Wellcome!</strong></h2>
        <form onSubmit={this.onSubmit}>
        <div className="form-group text-left">
        <label><i class="fa fa-envelope mr-2 text-info"></i>Enter Email</label>
       <input type="text" className={`form-control ${touch.email && 'is-invalid'}`} name="email" placeholder="Email" onChange={this.handleChange} value={user.email} onBlur={this.handleBlur} />
       <div className="invalid-feedback"></div>

      </div> 
      <div className="form-group text-left">
        <label><i class="fa fa-key mr-2 text-info"></i>Enter Password</label>
       <input type="password" className={`form-control ${touch.password && 'is-invalid'}`} name="password" placeholder="Password" onChange={this.handleChange} value={user.password} onBlur={this.handleBlur}/>
       <div className="invalid-feedback"></div>

      </div>
      <div className="form-group">
      <div class="custom-file">
        <button type="submit" className="btn btn-primary w-100 mt-3 mb-4 bg-info">Submit</button>
        </div>
      </div>
    </form>
    </div>
    </div>
    </Fragment>
    );
  }
}
}

