import React, { Component } from 'react';
import { Media, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';

export default class FriendComponent extends Component {
  render() {
    return (
      <ListGroupItem bsStyle={this.props.bsStyle}>
        <Media>
          <Media.Left>
            <img width={64} height={64} src="/assets/thumbnail.png" alt="Image" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>Username</Media.Heading>
            <p>First name Last name</p>
            <ButtonToolbar>
              <Button bsStyle="primary">Написать</Button>
              <Button bsStyle="link">Удалить из друзей</Button>
            </ButtonToolbar>
          </Media.Body>
        </Media>
      </ListGroupItem>
    );
  }
}

FriendComponent.propTypes = {
  bsStyle: React.PropTypes.string.isRequired,
};