import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faHouse, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavMenu.css';
import handleLogout from './Auth/Logout/Logout';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      isLoggedIn: localStorage.getItem('token') ? true : false,
      role: localStorage.getItem('role'),
    };
  }

  componentDidMount() {
    // Listen for changes in localStorage and update state accordingly
    window.addEventListener('storage', this.handleStorageChange);
    console.log('Role:', this.state.role);
  }

  componentWillUnmount() {
    // Remove the event listener when the component unmounts
    window.removeEventListener('storage', this.handleStorageChange);
  }

  handleStorageChange = () => {
    // Update state when localStorage changes
    this.setState({
      isLoggedIn: localStorage.getItem('token') ? true : false,
      role: localStorage.getItem('role'),
    });
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleLogout = async () => {
    await handleLogout();
    this.setState({ isLoggedIn: false, role: null });
  };

  render() {
    const { isLoggedIn, role } = this.state;

    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <div className="container">
            <div className="d-flex align-items-center">
              <Link className="navbar-brand mr-2" to="/">
                iKonsept
              </Link>
              <div className="tooltip-container">
                <FontAwesomeIcon icon={faQuestionCircle} className="question-icon" />
                <span className="tooltiptext">
                iKonsept er en nettside for konseptoversettelser.
                <p class="space"> </p>
                Den overordnede målsetningen med nettsiden er å øke kvalitet og effektivitet av integreringsarbeidet av fremmedkulturelle ved å gjøre bruk av konseptoversettelser.
                <p class="space"> </p>
                En konseptoversettelse er en oversettelse av et begrep ved hjelp av kulturelt forankrede metaforer slik at det gir mening og skaper en relevant emosjonell reaksjon hos mottakeren.
                <p class="space"> </p>
                <p>© Copyright, LMHH & BHF </p>
                  </span>
              </div>
            </div>
            <button className="navbar-toggler" type="button" onClick={this.toggleNavbar}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={'collapse navbar-collapse justify-content-end' + (this.state.collapsed ? '' : ' show')}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/">
                    <FontAwesomeIcon icon={faHouse} />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/suggestTranslation">
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </li>
                {isLoggedIn ? (
                  <>
                    {((role === 'Redaktør') || (role === 'Admin')) && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/approveSuggestions">
                          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <span className="nav-link text-dark">Velkommen, {localStorage.getItem('firstName')}!</span>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        <i class="bi bi-person-circle fs-5"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link text-light btn btn-secondary btn-sm" onClick={this.handleLogout}>
                        Logg ut
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/register">
                        <strong>Registrer bruker</strong>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/login">
                        <strong>Logg inn</strong>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
