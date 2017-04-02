import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { darkBlack } from 'material-ui/styles/colors';

export default class ChatComponent extends Component {
  render() {
    return (
      <div>
        <ListItem
          leftAvatar={<Avatar src="images/ok-128.jpg" />}
          primaryText="Brendan Lim"
          secondaryText={
            <p>
              <span style={{ color: darkBlack }}>Brunch this weekend?</span><br />
              I will be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset />
      </div>
    );
  }
}
