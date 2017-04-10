import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import FriendComponent from './friend';
import { loadFriends, loadFriendsSuccess, loadFriendsFail } from '../actions/friendship';

const FRIENDS = [
  { id: 1, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 2, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 3, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 4, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 5, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 6, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 7, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
  { id: 8, username: 'AAAA', first_name: 'FN', last_name: 'LN', avatar: '/' },
];

class FriendsComponent extends Component {

  state = {
    friendsList: [],
  };

  componentDidMount() {
    this.props.loadFriends();
    fetch('http://localhost:8080/api/friendship/',
      {
        method: 'GET',
        credentials: 'same-origin',
        body: {
          format: 'json',
        },
      })
      .then(promise => promise.json())
      .then((json) => {
        this.props.loadFriendsSuccess(json.map(rec => rec.friend));
      });

    const friends = FRIENDS.map(
          friend => (<FriendComponent
            key={friend.id}
            username={friend.username}
            first_name={friend.first_name}
            last_name={friend.last_name}
            bsStyle=""
          />),
        );

    this.setState({
      friendsList: friends,
    });
  }

  render() {
    return (
      <div> { this.state.isLoading ?
        <CircularProgress size={60} thickness={7} /> : this.props.friendsList
      }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.friendship.isLoading,
  friendsList: state.friendship.friendsList,
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
