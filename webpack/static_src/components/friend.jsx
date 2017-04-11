import React, { Component } from 'react';
import { Media, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

export const FRIENDSHIPS = 'FRIENDSHIPS';
export const FRIENDSHIP_REQUESTS = 'FRIENDSHIP_REQUESTS';
export const FRIENDSHIP_WAITINGS = 'FRIENDSHIP_WAITINGS';

class FriendComponent extends Component {
  render() {
    let bsStyle;
    let BUTTONS;
    switch (this.props.type) {
      case FRIENDSHIPS:
        bsStyle = '';
        BUTTONS = (
          <ButtonToolbar>
            <Button bsStyle="primary">Написать</Button>
            <Button bsStyle="link">Удалить из друзей</Button>
          </ButtonToolbar>
        ); break;
      case FRIENDSHIP_REQUESTS:
        bsStyle = 'info';
        BUTTONS = (
          <ButtonToolbar>
            <Button bsStyle="primary">Добавить в друзья</Button>
            <Button bsStyle="link">Отклонить заявку</Button>
            <Button bsStyle="link">Написать</Button>
          </ButtonToolbar>
        ); break;
      case FRIENDSHIP_WAITINGS:
        bsStyle = 'warning';
        BUTTONS = (
          <ButtonToolbar>
            <Button bsStyle="primary">Отменить предложение</Button>
            <Button bsStyle="link">Написать</Button>
          </ButtonToolbar>
        ); break;
      default:
        bsStyle = '';
    }

    return (
      <ListGroupItem bsStyle={bsStyle}>
        <Media>
          <Media.Left>
            <img width={64} height={64} src={this.props.user.avatar} alt="User's avatar" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.user.username}</Media.Heading>
            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
            { BUTTONS }
          </Media.Body>
        </Media>
      </ListGroupItem>
    );
  }
}

FriendComponent.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users[props.id],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendComponent);
