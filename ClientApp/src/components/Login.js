import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        password: ''
      },
      message: ''
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
    try {
      const response = await axios.post('/api/login', this.state.formData);
      if (response.status === 200) {
        this.setState({ message: 'Login successful' });
        // Redirect user or perform other actions upon successful login
      } else {
        this.setState({ message: 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      this.setState({ message: `An error occurred: ${error.message || error.toString()}` });
    }
  };

  render() {
    const { formData, message } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={this.handleChange}
              required
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
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
}

export default Login;
