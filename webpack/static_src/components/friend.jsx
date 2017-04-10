import React, { Component } from 'react';
import { Media, Button, ButtonToolbar, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FriendComponent extends Component {
  render() {
    // console.log(this.props);
    // const username = this.props.user.username;
    return (
      <ListGroupItem bsStyle={this.props.bsStyle}>
        <Media>
          <Media.Left>
            <img width={64} height={64} src={this.props.user.avatar} alt="User's avatar" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>{this.props.user.username}</Media.Heading>
            <p>{this.props.user.first_name} {this.props.user.last_name}</p>
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
  id: React.PropTypes.number.isRequired,
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
