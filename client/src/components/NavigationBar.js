import React, { Component } from 'react';
import './NavigationBar.css'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
class NavigationBar extends Component {
  render() {
    return (
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>
/*
      <div>
        <Navbar color="black" light expand="md">
          <NavbarBrand href="/">Alex Bisaillion</NavbarBrand>
          <Nav className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
      */
    );
  }
}

export default NavigationBar;
