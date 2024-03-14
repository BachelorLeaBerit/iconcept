import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import TranslationTable from "../Tables/TranslationTable";
import axios from "axios";
import TranslationDetailsTable from "../Tables/TranslationDetailsTable";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      translations: [],
      loading: true,
      showTerms: true,
      searchTerm: "",
      searchCountry: "",
      searchRegion: "",
      selectedTranslation: null,
    };
  }

  componentDidMount() {
    this.populateConceptsData();
  }

  handleSearchChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearch = () => {
    this.populateConceptsData();
  };

  handleRowClick = (translation) => {
    this.setState({ selectedTranslation: translation });
  };

  render() {
    const {
      loading,
      searchCountry,
      searchRegion,
      searchTerm,
      translations,
      selectedTranslation,
    } = this.state;

    if (loading) {
      return (
        <p>
          <em>Loading...</em>
        </p>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              placeholder="Region"
              name="searchRegion"
              value={this.searchRegion}
              onChange={this.handleSearchChange}
              class="form-control"
              maxLength={30}
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Land"
              name="searchCountry"
              value={this.searchCountry}
              onChange={this.handleSearchChange}
              class="form-control"
              maxLength={30}
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Begrep"
              name="searchTerm"
              value={this.searchTerm}
              onChange={this.handleSearchChange}
              class="form-control"
              maxLength={30}
            />
          </div>
          <div className="col">
            <button
              onClick={this.handleSearch}
              className="btn btn-outline-dark"
            >
              <FontAwesomeIcon icon={faFilter} /> Søk
            </button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%", paddingRight: "1rem" }}>
            <h2>List of Terms</h2>
            <TranslationTable translations={translations} handleRowClick={this.handleRowClick}></TranslationTable>
          </div>
          <div style={{ width: "50%" }}>
            <h2>Translation Details</h2>
            {selectedTranslation && (
              <TranslationDetailsTable translation={selectedTranslation} />
            )}
          </div>
        </div>
      </div>
    );
  }

  async populateConceptsData() {
    try {
      const { searchTerm, searchRegion, searchCountry } = this.state;
      const response = await axios.get(
        `api/translations?searchTerm=${searchTerm}&searchRegion=${searchRegion}&searchCountry=${searchCountry}`
      );
      if (response.status === 200) {
        const translations = response.data;
        this.setState({ translations: translations, loading: false });
        console.log("Fetched translation data:", translations);
      } else {
        console.error(
          "Failed to fetch translation data, status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching translation data:", error);
      this.setState({ loading: false });
    }
  }
}
