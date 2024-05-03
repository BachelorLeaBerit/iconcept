import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavMenu.css';
import handleLogout from './Auth/Logout/Logout'; 

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      isLoggedIn: localStorage.getItem('token') ? true : false,
      role: localStorage.getItem('role') 
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleLogout = async () => {
    await handleLogout(); 
    this.setState({ isLoggedIn: false, role: null });
  };

  render() {
    const { isLoggedIn, role } = this.state;
    console.log("Role:", role);

    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <div className="container">
            <Link className="navbar-brand" to="/">iKonsept</Link>
            <button className="navbar-toggler" type="button" onClick={this.toggleNavbar}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse justify-content-end" + (this.state.collapsed ? "" : " show")}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-dark" to="/"><FontAwesomeIcon icon={faHouse} /></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/suggestTranslation"><FontAwesomeIcon icon={faPlus} /></Link>
                </li>
                {isLoggedIn ? (
                  <>
                  { ((role === "Redaktør") || (role === "Admin")) && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/approveSuggestions"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Link>
                    </li>
                  )}
                  { role === "Admin" && (
                      <li className="nav-item">
                        <Link className="nav-link text-dark" to="/admin"> <strong>Admin</strong> </Link>
                      </li>
                    )}
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile"><FontAwesomeIcon icon={faUser} /></Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link text-dark btn btn-light btn-sm" onClick={this.handleLogout}> Logg ut</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/register"> <strong>Registrer bruker</strong> </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-dark" to="/login"><strong>Logg inn</strong> </Link>
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
