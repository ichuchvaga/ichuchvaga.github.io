import React, { Component } from 'react';
import './header.sass';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';  

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
        }
        toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


  render() {      
    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 header__l">
                        <a className="logo" href="/">
                            <img src="src/img/logo-300x90.png" alt=""/>
                        </a>
                    </div>

                    <div className="col-md-8 header__r">

                        <Navbar color="" expand="lg">

                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">My Listings</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">Create New</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">Pro Tools</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/">Help</NavLink>
                                    </NavItem>
                                
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Agent settings
                                        </DropdownToggle>

                                        <DropdownMenu right>
                                            <DropdownItem>
                                            Profile
                                            </DropdownItem>
                                            <DropdownItem>
                                            Logout
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>

                    </div>

                    <NavbarToggler onClick={this.toggle} >
                        <span className="navbar-toggler-icon">
                            <span className="line line1"></span>
                            <span className="line line2"></span>
                            <span className="line line3"></span>
                        </span>
                    </NavbarToggler>
                </div>
            </div>
        </header>
    );
  }
}

export default Header;