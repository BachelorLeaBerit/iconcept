
/*
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

*/

import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        FirstName:"",
        Password:"",
      },
      message:"",
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
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Attempt to parse the JSON response regardless of response status
      // This assumes your server always returns JSON; adjust as needed.
      const data = await response;
      console.log(data);
  
      if (!response.ok) {
        // If the server response is not ok, use the parsed JSON data to display an error message
        // Adjust depending on the structure of your error response
        const errorMessage = data.message || 'Registration failed';
        this.setState({ message: errorMessage });
      } else {
        // Handle success
        console.log(data); // For debugging, you can remove or adjust this
        this.setState({ message: 'Registration successful' });
      }
    } catch (error) {
      // Handle network errors or errors parsing the response
      console.error('Registration error:', error);
      this.setState({ message: `An error occurred: ${error.message || error.toString()}` });
  };
  }
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
              name="FirstName"
              value={formData.FirstName}
              onChange={this.handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={this.handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
};


export default Register;
