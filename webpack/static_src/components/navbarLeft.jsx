import React, { Component } from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
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
             Моя страница
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="news">
            Новости
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="friends">
            Друзья
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="chats">
            Чаты
          </NavItem>
          <NavItem onSelect={this.onSelect} eventKey="people">
            Люди
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
