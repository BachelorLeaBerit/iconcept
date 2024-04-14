// Login.js
import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import LoginMessage from './LoginMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
        password: ''
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
      const response = await axios.post('/api/login', this.state.formData);
      console.log('Response:', response);

      if (response.status === 200) {
        window.location.href = '/profile';
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.id);
      } else {
        this.setState({ message: 'Ikke gyldig logg inn' });
      }
    } catch (error) {
      this.setState({ message: 'Feil e-post eller passord' });
    }
  };

  render() {
    const { formData, message } = this.state;

    return (
      <div className="container d-flex justify-content-center align-items-center vh-80 mt-5">
        <div className="card p-4">
          <h2 className="text-center mb-3">Logg inn</h2>
          <LoginForm
            formData={formData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <LoginMessage message={message} />
        </div>
      </div>
    );
  }
}

export default Login;
