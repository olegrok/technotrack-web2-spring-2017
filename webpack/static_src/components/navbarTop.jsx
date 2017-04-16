import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';

class NavbarTop extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">SoNet</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Act</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">{this.props.profile.username}</NavItem>
            <NavItem>
              <Image width={35} height={35} src={this.props.profile.avatar} circle />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.layout.account,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarTop);
