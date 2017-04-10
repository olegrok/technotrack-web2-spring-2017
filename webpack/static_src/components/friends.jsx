import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import { loadFriends, loadFriendsSuccess, loadFriendsFail } from '../actions/friendship';
import { FRIENDSHIPS, FRIENDSHIP_REQUESTS, FRIENDSHIP_WAITINGS } from './friend';

class FriendsComponent extends Component {
  url = '';

  componentDidMount() {
    this.props.loadFriends();
    fetch(this.url,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        this.props.loadFriendsSuccess(json.map(rec => rec.friend), this.props.type);
      });
  }

  render() {
    let listProps;
    switch (this.props.type) {
      // todo
      case FRIENDSHIPS:
        this.url = 'http://localhost:8080/api/friendship/';
        listProps = this.props.friendsList;
        break;
      case FRIENDSHIP_REQUESTS:
        this.url = 'http://localhost:8080/api/friendship/';
        listProps = this.props.friendshipRequestList;
        break;
      case FRIENDSHIP_WAITINGS:
        this.url = 'http://localhost:8080/api/friendship/';
        listProps = this.props.friendshipWaitList;
        break;
      default:
    }


    return (
      <div> { this.props.isLoading ?
        <CircularProgress size={60} thickness={7} /> : listProps
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
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FriendsComponent);
