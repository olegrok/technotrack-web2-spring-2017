import React, { Component } from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { selectPage } from '../actions/routing';


class NavbarLeft extends Component {
  state = {
    currentPageName: 'news',
  };

  onSelect = (currentMenu) => {
    this.props.selectPage(currentMenu);
  };

  render() {
    return (
      <Col xs={4} md={2}>
        <Nav bsStyle="pills" stacked activeKey={this.props.currentPage}>
          <NavItem onSelect={this.onSelect} eventKey="mypage">
            <Link to="/wall"> Моя страница </Link>
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="news">
            <Link to="/news"> Новости </Link>
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="friends">
            <Link to="/friends"> Друзья </Link>
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="chats">
            <Link to="/chats"> Чаты </Link>
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="people">
            <Link to="/people"> Люди </Link>
          </NavItem>
        </Nav>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  currentPage: state.router.currentPage,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    selectPage,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarLeft);
