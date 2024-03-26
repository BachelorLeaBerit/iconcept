import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ValidateUserForm } from './Validation/UserValidation';

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
      errors: {}, // Add errors object to store validation errors
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

    // Validate form data
    const errors = ValidateUserForm(formData);
    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them to state and return
      this.setState({ errors });
      return;
    }

    try {
      const response = await axios.post(`api/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        this.setState({ message: `Registrering vellykket`, redirectToLogin: true });
      } else {
        const errorMessage = response.data.errors ? response.data.errors.join(', ') : 'Registrering mislyktes';
        this.setState({ message: errorMessage });
      }
    } catch (error) {
      console.error('Registreringsfeil:', error);
      let errorMessage = 'En feil oppstod';
    
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'Ingen svar fra serveren';
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message || errorMessage;
      }
    
      this.setState({ message: errorMessage });
    }
  }
  
  render() {
    const { formData, errors, message, redirectToLogin } = this.state;

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
                className={`form-control ${errors.firstName && 'is-invalid'}`} // Add 'is-invalid' class if there's an error
                id="firstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={this.handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>} {/* Display error message */}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Etternavn</label>
              <input
                type="text"
                className={`form-control ${errors.lastName && 'is-invalid'}`} // Add 'is-invalid' class if there's an error
                id="lastName"
                name="LastName"
                value={formData.LastName}
                onChange={this.handleChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>} {/* Display error message */}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-post</label>
              <input
                type="text"
                className={`form-control ${errors.email && 'is-invalid'}`} // Add 'is-invalid' class if there's an error
                id="email"
                name="Email"
                value={formData.Email}
                onChange={this.handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>} {/* Display error message */}

            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Passord</label>
              <input
                type="password"
                className={`form-control ${errors.password && 'is-invalid'}`} // Add 'is-invalid' class if there's an error
                id="password"
                name="Password"
                value={formData.Password}
                onChange={this.handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>} {/* Display error message */}

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
