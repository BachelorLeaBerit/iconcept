import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
      },
      message: '',
      redirectToHome: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      errors: { // Clear corresponding error when input changes
        ...prevState.errors,
        [name]: ''
      }
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', this.state.formData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        this.setState({ message: 'Suksessfull logg inn', redirectToHome: true });
      } else {
        this.setState({ message: 'Ikke gyldig logg inn' });
      }
    } catch (error) {
      this.setState({ message: `Feil e-post eller passord`});
    }
  };

  render() {
    const { formData, message, redirectToHome } = this.state;

    if (redirectToHome) {
      return <Navigate to="/profile" />;
    }

    return (
      <div className="container d-flex justify-content-center align-items-center vh-80 mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-3">Logg inn</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-post</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
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
                name="password"
                value={formData.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="text-center">
            <button type="submit" className="btn btn-success align-center">Logg inn</button>
            </div>
          </form>
          {message && <p className="mt-3 text-danger">{message}</p>}
        </div>
      </div>
    );
  }
}

export default Login;
