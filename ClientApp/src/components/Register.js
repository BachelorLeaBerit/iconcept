/*
import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstname: '',
        surname: '',
        email: '',
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

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        this.setState({ message: 'Registration successful' });
      } else {
        this.setState({ message: 'Registration failed: ' + data.errors.join(', ') });
      }
    } catch (error) {
      this.setState({ message: 'An error occurred: ' + error.toString() });
    }
  };

  render() {
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
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
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
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
}

export default Register;
*/