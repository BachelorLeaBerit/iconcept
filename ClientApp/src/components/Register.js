import React, { Component } from "react";
import axios from "axios";

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        password: '',
      },
      message: '',
    };

    // Binding the event handler methods to 'this' context
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // Updating the state based on input field changes
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const res = await axios.post("/api/register", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  render() {
    const { name, password } = this.state.formData;

    return (
      <div>
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account
        </p>
        <form className='form' onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              required
            />
          </div>

          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={password}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            value='Register'
          />
        </form>
      </div>
    );
  }
}

export default Register;

/*
 export default Register;

 import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstname: '',
        password: '',
      },
      message: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { formData } = this.state;


    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: ({
          firstname: formData.firstname,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response;
  
      if (response.status === 201) {
        this.setState({ message: 'Registration successful' });
      } else {
        // Assuming 'data.errors' exists and is an array; you may need to adjust based on your API.
        this.setState({ message: 'Registration failed: ' + data.errors.join(', ') });
      }
    } catch (error) {
      // Here you handle any error that occurred in the try block
      // 'data' is not accessible here if the error occurred before 'data' was defined
      this.setState({ message: 'An error occurred: ' + error.toString() });
      // Removed the logging of 'data' here since it's not defined in this scope
    }
  } // Add a closing curly brace here

  render() {
    console.log(this.state.formData);
    const { formData, message } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <button type="submit"
 >Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
};
*/
