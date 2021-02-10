import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' }
  };

  handleSubmit = e => {
    // this prevents submitting a form to the server which causes a full page reload
    e.preventDefault();

    // call the server, save changes, then redirect user to new page
    // this returns the actual DOM element
    console.log('submitted');
  };

  handleChange = ({ currentTarget: input }) => {
    // Do not want to update state directly. We want to clone it and then have react update the state
    const account = {...this.state.account}
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input 
            name="username" 
            value={account.username} 
            label="Username" 
            onChange={this.handleChange} 
          />
          <Input 
              name="password" 
              value={account.password} 
              label="Password" 
              onChange={this.handleChange} 
            />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
 
export default LoginForm;