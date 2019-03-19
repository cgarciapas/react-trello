import React, { Component, Fragment } from 'react'
import authService from '../services/AuthService';
import { Redirect, Link } from 'react-router-dom';

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;

const validators = {
  email: (value) => {
    let error;
    if (!value || value === '') {
      error = 'Email is required';
    } else if (!emailPattern.test(value)) {
      error = 'Invalid email format'; 
    }
    return error;
  },
  password: (value) => {
    let error;
    if (!value) {
      error = 'Password is required';
    } else if (!value.length >= 8) {
      error = 'Password must contains at least 8 characters';
    }
    return error;
  }
}

export default class Register extends Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {},
    touch: {},
    authenticated: false
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (!this.hasErrors()) {
      authService.register(this.state.user)
      .then(user=> this.setState({ authenticated: true }, () => console.log(user)),
        (error) => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...this.state.errors,
              ...errors,
              password: message
            }
          })
        }
      )
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validators[name] && validators[name](value)
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

  hasErrors = () => Object.keys(this.state.user)
    .some(attr => validators[attr] && validators[attr](this.state.user[attr]))
  
  render() {
    const { touch, errors, user } = this.state;

    if (this.state.authenticated) {
      return (
      <Redirect to='/auth/login' />
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
       <input type="text" className={`form-control ${touch.email && errors.email && 'is-invalid'}`} name="email" placeholder="Email" onChange={this.handleChange} value={user.email} onBlur={this.handleBlur} />
       <div className="invalid-feedback">{errors.email}</div>

      </div> 
      <div className="form-group text-left">
        <label><i class="fa fa-key mr-2 text-info"></i>Enter Password</label>
       <input type="password" className={`form-control ${touch.password && errors.password && 'is-invalid'}`} name="password" placeholder="Password" onChange={this.handleChange} value={user.password} onBlur={this.handleBlur}/>
       <div className="invalid-feedback">{errors.password}</div>

      </div>
      <div className="form-group">
      <div class="custom-file">
        <button type="submit" className="btn btn-primary w-100 mt-3 mb-4 bg-info" disabled={this.hasErrors()}>Submit</button>
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

