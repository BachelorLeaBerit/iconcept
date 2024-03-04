import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        Username: "",
        Password: "",
      },
      message: "",
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
      const response = await axios.post(`api/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = response.data;
  
      if (response.status === 201) {
        this.setState({ message: `Registration successful for ${data.username}` });
      } else {
        const errorMessage = response.data.message || 'Registration failed';
        this.setState({ message: errorMessage });
      }
    } catch (error) {
      console.error('Registration error:', error);
      this.setState({ message: `An error occurred: ${error.message || error.toString()}` });
    }

  }

  render() {
    const { formData, message } = this.state;
    console.log(formData);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={this.handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password
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
