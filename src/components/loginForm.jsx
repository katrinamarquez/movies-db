import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
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

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null; 

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    Joi.validate(obj, schema);
    return error ? error.details[0].message : null; 
  };

  handleSubmit = e => {
    // this prevents submitting a form to the server which causes a full page reload
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    // Updates state which will cause re-rendering and then show error message
    this.setState({ errors: errors || {}  });
    if (errors) return;
    // call the server, save changes, then redirect user to new page
    // this returns the actual DOM element
    console.log('submitted');
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    // Do not want to update state directly. We want to clone it and then have react update the state
    const account = {...this.state.account}
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input 
            name="username" 
            value={account.username} 
            label="Username" 
            onChange={this.handleChange} 
            error={errors.username}
          />
          <Input 
              name="password" 
              value={account.password} 
              label="Password" 
              onChange={this.handleChange} 
              error={errors.password}
            />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
 
export default LoginForm;