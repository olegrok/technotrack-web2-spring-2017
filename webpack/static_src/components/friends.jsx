import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import { loadFriends, loadFriendsSuccess, loadFriendsFail, fetchFriends } from '../actions/friendship';
import { FRIENDSHIPS, FRIENDSHIP_REQUESTS, FRIENDSHIP_WAITINGS } from './friend';

class FriendsComponent extends Component {
  componentDidMount() {
    this.props.fetchFriends(this.url, this.field, this.props.type);
  }

  url = '';
  field = '';

  render() {
    let listProps;
    switch (this.props.type) {
      case FRIENDSHIPS:
        this.url = '/api/friendship/';
        listProps = this.props.friendsList;
        this.field = 'friend';
        break;
      case FRIENDSHIP_REQUESTS:
        this.url = '/api/friendshiprequests/?format=json&status=requested';
        listProps = this.props.friendshipRequestList;
        this.field = 'initiator';
        break;
      case FRIENDSHIP_WAITINGS:
        this.url = '/api/friendshiprequests/?format=json&status=waiting';
        listProps = this.props.friendshipWaitList;
        this.field = 'recipient';
        break;
      default:
    }

    return (
      <div> { this.props.isLoading & this.props.type === FRIENDSHIPS ?
        <CircularProgress size={60} thickness={7} /> :
        listProps
      }
      </div>
    );
  }
}

FriendsComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.friendship.isLoading,
  friendsList: state.friendship.friendsList,
  friendshipRequestList: state.friendship.friendshipRequestList,
  friendshipWaitList: state.friendship.friendshipWaitList,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    loadFriends,
    loadFriendsSuccess,
    loadFriendsFail,
    fetchFriends,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsComponent);
