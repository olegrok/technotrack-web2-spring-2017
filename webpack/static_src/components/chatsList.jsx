import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { List } from 'material-ui/List';
import ChatComponent from './chat';

injectTapEventPlugin();

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
