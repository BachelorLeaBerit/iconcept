import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavMenu.css';
import { faCheck, faCirclePlus, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import LogoutButton from './LogoutButton';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      isLoggedIn: localStorage.getItem('token') ? true : false // Check if token exists
    };
  }

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleLogout = async () => {
    await LogoutButton();
    localStorage.removeItem('token'); // Remove token from local storage on logout
    this.setState({ isLoggedIn: false }); // Update isLoggedIn state
  };

  handleLogin = () => {
    // Assuming you have some mechanism to set isLoggedIn to true upon successful login
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/" className="mr-auto">iKonsept</NavbarBrand> {/* Centered relative to other items */}
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/suggestTranslation"><FontAwesomeIcon icon={faCirclePlus} /></NavLink>
              </NavItem>
              {isLoggedIn ? (
                <>
                  <NavItem>
                    <NavLink tag={Link} to="/approveSuggestions"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/admin"> <strong>Admin</strong> </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>
                  </NavItem>
                  <NavItem>
                    <Button tag={Link} className="text-dark btn-light btn-sm" to="/" onClick={this.handleLogout}> Logg ut</Button>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register"> <strong>Registrer bruker</strong> </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/login"><strong>Logg inn</strong> </NavLink>
                  </NavItem>
                </>
              )}
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
