import React, { Component } from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';

class NavbarLeft extends Component {
  render() {
    return (
      <Col xs={4} md={2}>
        <Nav bsStyle="pills" stacked>
          <NavItem active eventKey="mypage">
            Моя страница
          </NavItem>
          <NavItem eventKey="news">
            Новости
          </NavItem>
          <NavItem eventKey="friends">
            Друзья
          </NavItem>
          <NavItem eventKey="chats">
            Чаты
          </NavItem>
          <NavItem eventKey="people">
            Люди
          </NavItem>
        </Nav>
      </Col>
    );
  }
}

export default NavbarLeft;
