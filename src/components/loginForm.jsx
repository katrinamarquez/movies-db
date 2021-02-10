import React, { Component } from 'react';

class LoginForm extends Component {
  handleSubmit = e => {
    // this prevents submitting a form to the server which causes a full page reload
    e.preventDefault();

    // call the server, save changes, then redirect user to new page
    // this returns the actual DOM element
    console.log('submitted');
  };

  render() { 
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="form-control"/>
            </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control"/>
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
 
export default LoginForm;