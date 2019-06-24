import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import github from '../img/github.svg';
import linkedin from '../img/linkedin.svg';
import gmail from '../img/gmail.svg';


class NavigationBar extends Component {
  render() {
    return (
      <div>
        <Navbar color="black" light expand="md">
          <NavbarBrand href="/">Alex Bisaillion</NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="https://github.com/alexbisaillion">
                <svg width={35} height={35}>       
                  <image xlinkHref="https://simpleicons.org/icons/github.svg" height={35} width={35}/>
                </svg>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.linkedin.com/in/alexbisaillion/">
                <svg width={35} height={35}>       
                  <image xlinkHref="https://simpleicons.org/icons/linkedin.svg" height={35} width={35}/>
                </svg>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="mailto:a.bisaillion@gmail.com">
                <svg width={35} height={35}>       
                  <image xlinkHref="https://simpleicons.org/icons/gmail.svg" height={35} width={35}/>
                </svg>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
