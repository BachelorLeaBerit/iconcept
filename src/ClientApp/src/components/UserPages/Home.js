import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import TranslationTable from "../Tables/TranslationTable";
import axios from "axios";
import TranslationDetailsTable from "../Tables/TranslationDetailsTable";
import TablePagination from "@mui/material/TablePagination";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      translations: [],
      loading: true,
      searchCountry: "",
      searchRegion: "",
      searchTerm: "",
      pageNumber: 1,
      pageSize: 10,
      totalPages: 0,
      totalCount: 0,
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
    this.setState({ pageNumber: 1 }, () => this.populateConceptsData());
  };

  handleRowClick = (translation) => {
    this.setState({ selectedTranslation: translation });
  };

  handlePageChange = (newPage) => {
    this.setState({ pageNumber: newPage }, () => this.populateConceptsData());
  };

  render() {
    const {
      loading,
      searchCountry,
      searchRegion,
      searchTerm,
      translations,
      selectedTranslation,
      pageNumber,
      pageSize,
      totalPages,
      totalCount,
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
              value={searchRegion}
              onChange={this.handleSearchChange}
              className="form-control"
              maxLength={30}
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Land"
              name="searchCountry"
              value={searchCountry}
              onChange={this.handleSearchChange}
              className="form-control"
              maxLength={30}
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Begrep"
              name="searchTerm"
              value={searchTerm}
              onChange={this.handleSearchChange}
              className="form-control"
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
            <h4 className="mt-3">Begreper</h4>
            <TranslationTable
              translations={translations}
              handleRowClick={this.handleRowClick}
            ></TranslationTable>
            <TablePagination
              component="div"
              count={totalCount}
              page={pageNumber - 1}
              onPageChange={(event, newPage) =>
                this.handlePageChange(newPage + 1)
              } 
              rowsPerPage={pageSize}
              onRowsPerPageChange={(event) => {
                const newSize = parseInt(event.target.value, 10);
                this.setState({ pageSize: newSize, pageNumber: 1 }, () =>
                  this.populateConceptsData()
                );
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <h4 className="mt-3">Oversettelsesdetaljer</h4>
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
      const { searchTerm, searchRegion, searchCountry, pageNumber, pageSize } =
        this.state;
      const response = await axios.get(
        `api/translations?searchTerm=${searchTerm}&searchRegion=${searchRegion}&searchCountry=${searchCountry}&PageNumber=${pageNumber}&PageSize=${pageSize}`
      );
      if (response.status === 200) {
        const { translations, totalCount, totalPages } = response.data;
        this.setState({
          translations: translations,
          totalCount: totalCount,
          totalPages: totalPages,
          loading: false,
        });
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
