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
      isLoggedIn: false, 
      countdown: 5,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true });
      this.startCountdown();
    }
  }

  startCountdown = () => {
    this.countdownInterval = setInterval(() => {
      this.setState(prevState => ({
        countdown: prevState.countdown - 1,
      }), () => {
        if (this.state.countdown === 0) {
          clearInterval(this.countdownInterval);
          window.location.href = '/';
        }
      });
    }, 1000);
  };

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
      const loginresponse = await axios.post('/api/login', this.state.formData);

      if (loginresponse.status === 200) {
        window.location.href = '/profile';
        localStorage.setItem('token', loginresponse.data.token);
        localStorage.setItem('role', loginresponse.data.role);
        localStorage.setItem('email', loginresponse.data.email);
        localStorage.setItem('lastName', loginresponse.data.lastName);
        localStorage.setItem('firstName', loginresponse.data.firstName);
        
      } else {
        this.setState({ message: 'Ikke gyldig logg-inn' });
      }
    } catch (error) {
      this.setState({ message: 'Feil e-post eller passord' });
    }
  };

  render() {
    const { formData, message, isLoggedIn, countdown } = this.state;

    if (isLoggedIn) {
      return (
        <div className="container text-center">
          <h2>Du er allerede logget inn.</h2>
          <p>Du blir omdirigert til hjemmesiden om {countdown} sekunder.</p>
        </div>
      );
    }

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
