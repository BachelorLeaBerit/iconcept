import React, { Component } from 'react';
import axios from 'axios';

export class FeelingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feelings: [],
    };
  }

  componentDidMount() {
    this.fetchFeelings();
  }

  async fetchFeelings() {
    try {
      const response = await axios.get('/api/feelings');
      this.setState({
        feelings: response.data,
      });
    } catch (error) {
      console.error('Error fetching feelings:', error);
    }
  }

  render() {
    return (
      <div>
        <h2>Feelings List</h2>
        <ul>
          {this.state.feelings.map(feeling => (
            <li key={feeling.id}>{feeling.feelingName}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FeelingList;
