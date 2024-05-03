import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { ValidateUserForm } from '../../../utils/Validation/UserValidation';
import RegisterForm from './RegisterForm';

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
      errors: {},
      message: "",
      redirectToLogin: false,
      isLoggedIn: false,
      emailError: "", // Add emailError state
    };
  }

  componentDidMount() {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true });
    }
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

    const errors = ValidateUserForm(formData);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    try {
      // Register user
      const registerResponse = await axios.post(`api/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (registerResponse.status === 201) {
        this.setState({ message: "Registrering vellykket", redirectToLogin: true });
      } else {
        const errorMessage = registerResponse.data.errors ? registerResponse.data.errors.join(', ') : "Registrering mislyktes / E-post brukes allerede";
        this.setState({ message: errorMessage });
      }
    } catch (error) {
      console.error('Registreringsfeil:', error);
      let errorMessage = 'En feil oppstod';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
        if (error.response.data.errors && error.response.data.errors.email) {
          this.setState({ emailError: error.response.data.errors.email });
        }
      } else if (error.request) {
        errorMessage = 'Ingen svar fra serveren';
      } else {
        errorMessage = error.message || errorMessage;
      }

      this.setState({ message: errorMessage });
    }
  }

  render() {
    const { formData, errors, message, redirectToLogin, isLoggedIn, emailError } = this.state;

    if (isLoggedIn) {
      return (
        <div className="container text-center">
          <h3>Du må logge ut for å registrere ny bruker.</h3>
        </div>
      );
    }

    if (redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div>
        {emailError && <div className="alert alert-danger">{emailError}</div>}
        <RegisterForm
          formData={formData}
          errors={errors}
          message={message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Register;
