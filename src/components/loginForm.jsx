import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    // Properties in this object map to the properties of the input field
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = () => {
    console.log('submitted');
  }

  render() {
    
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username','Usename')}
          {this.renderInput('password','Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
 
export default LoginForm;