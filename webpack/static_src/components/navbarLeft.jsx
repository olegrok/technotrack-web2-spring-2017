import React, { Component } from 'react';
import { Col, Nav, NavItem } from 'react-bootstrap';

class NavbarLeft extends Component {
  state = {
    currentPageName: 'news',
  };

  onSelect = (eventKey) => {
    this.props.onSelect(eventKey);
    this.setState({
      currentPageName: eventKey,
    });
  };

  render() {
    return (
      <Col xs={4} md={2}>
        <Nav bsStyle="pills" stacked activeKey={this.state.currentPageName}>
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

NavbarLeft.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
};

export default NavbarLeft;
