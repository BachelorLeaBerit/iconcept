import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
      },
      message: "",
      redirectToLogin: false,
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
        this.setState({ message: `Registration successful for ${data.email}`, redirectToLogin: true });
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
    const { formData, message, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="container d-flex justify-content-center align-items-center vh-50 mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-4">Registrer ny bruker</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">Fornavn</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Etternavn</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="LastName"
                value={formData.LastName}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-post</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="Email"
                value={formData.Email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Passord</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Registrer</button>
            </div>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    );
  }
}

export default Register;
