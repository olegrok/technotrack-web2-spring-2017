import React, { Component } from 'react';
import { List } from 'material-ui/List';
import ChatComponent from './chat';

export default class ChatsListComponent extends Component {
  render() {
    return (
      <List>
        {/* <Subheader>Messages</Subheader> */}
        <ChatComponent />
        <ChatComponent />
        <ChatComponent />
        <ChatComponent />
        <ChatComponent />
      </List>
    );
  }
}
