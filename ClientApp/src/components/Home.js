import React, { Component } from 'react';
import TermsTable from './Tables/TermsTable';
import FeelingsTable from './Tables/FeelingsTable';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { terms: [], feelings: [], loading: true, showTerms: true, country: '', region: '', religion: '' };
  }

  componentDidMount() {
    this.populateConceptsData();
  }

  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  toggleShowTerms = () => {
    this.setState({ showTerms: true });
  };

  toggleShowFeelings = () => {
    this.setState({ showTerms: false });
  };

  handleSearch = () => {
    const { country, region, religion } = this.state;
    const queryString = `?country=${country}&region=${region}&religion=${religion}`;
    // Make the API call with the constructed query string
    fetch(`api/translations/filtered${queryString}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const { terms, feelings } = data;
        this.setState({ terms: terms, feelings: feelings });
      })
      .catch(error => {
        console.error('Error fetching translation data:', error);
      });
  };

  render() {
    const { terms, feelings, loading, showTerms } = this.state;

    if (loading) {
      return <p><em>Loading...</em></p>;
    }

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Country"
            value={this.state.country}
            onChange={e => this.setState({ country: e.target.value })}
          />
          <input
            type="text"
            placeholder="Region"
            value={this.state.region}
            onChange={e => this.setState({ region: e.target.value })}
          />
          <input
            type="text"
            placeholder="Religion"
            value={this.state.religion}
            onChange={e => this.setState({ religion: e.target.value })}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          <button onClick={this.toggleShowTerms} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Terms</button>
          <button onClick={this.toggleShowFeelings} className="btn btn-primary btn-lg active" role="button" aria-pressed="true">Feelings</button>
        </div>
        {showTerms ? (
          <TermsTable terms={terms} />
        ) : (
          <FeelingsTable feelings={feelings} />
        )}
      </div>
    );
  }

  async populateConceptsData() {
    try {
      const response = await fetch(`api/translations`);
      if (response.ok) {
        const data = await response.json();
        const { terms, feelings } = data;
        this.setState({ terms: terms, feelings: feelings, loading: false });
        console.log('Fetched translation data:', data);
      } else {
        console.error('Failed to fetch translation data, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching translation data:', error);
      this.setState({ loading: false });
    }
  }
}
