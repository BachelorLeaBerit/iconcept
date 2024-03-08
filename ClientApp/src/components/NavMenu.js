import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faHouse } from '@fortawesome/free-solid-svg-icons';
import './NavMenu.css';
import LogoutButton from './LogoutButton';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
    this.handleLogout = this.handleLogout.bind(this);

  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  async handleLogout() {
    await LogoutButton();
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} to="/">iconcept</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/"><FontAwesomeIcon icon={faHouse} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/suggestTranslation"><FontAwesomeIcon icon={faCirclePlus} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/register"> Register </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/login"> Login </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/admin"> Admin </NavLink>
              </NavItem>
              <NavItem>
              <Button tag={Link} className="text-dark" to="/logout" onClick={this.handleLogout}> Logout</Button>
              </NavItem>

            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
