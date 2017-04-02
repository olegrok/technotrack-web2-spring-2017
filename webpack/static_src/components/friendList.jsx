import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import FriendsComponent from './friends';
import FriendshipRequestComponents from './friendshipRequests';

export default class FriendListLayout extends Component {
  render() {
    return (
      <ListGroup>
        <FriendshipRequestComponents />
        <FriendsComponent />
      </ListGroup>
    );
  }
}
