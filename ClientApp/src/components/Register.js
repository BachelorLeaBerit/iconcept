import React, { Component } from 'react';

export class Register extends Component {
  static displayName = Register.name;

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        Username:"",
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
      const response = await fetch(`api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(formData),
      });
  
      // Attempt to parse the JSON response regardless of response status
      const data = await response.json(); // Ensure you parse the JSON only if the Content-Type indicates JSON
      console.log("test1", data); // Logs after submission, as part of the response handling
  
      if (!response.ok) {
        // If the server response is not ok, use the parsed JSON data to display an error message
        const errorMessage = data.message || 'Registration failed';
        this.setState({ message: errorMessage });
      } else {
        // Handle success
        this.setState({ message: 'Registration successful' });
      }
    } catch (error) {
      // Handle network errors or errors parsing the response
      console.error('Registration error:', error);
      this.setState({ message: `An error occurred: ${error.message || error.toString()}` });
    };
  }

  render() {
    const { formData, message } = this.state;

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
