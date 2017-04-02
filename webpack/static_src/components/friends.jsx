import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import FriendComponent from './friend';

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

export default class FriendsComponent extends Component {

  state = {
    friendsList: [],
    isLoading: true,
  };

  componentDidMount() {
    const friends = FRIENDS.map(
          friend => <FriendComponent
            key={friend.id}
            username={friend.username}
            first_name={friend.first_name}
            last_name={friend.last_name}
            bsStyle=""
          />,
        );
    this.setState({
      friendsList: friends,
      isLoading: false,
    });
  }

  render() {
    return (
      <div> { this.state.isLoading ?
        <CircularProgress size={60} thickness={7} /> : this.state.friendsList
      }
      </div>
    );
  }
}

FriendsComponent.defaultProps = {
  isLoading: true,
};

FriendsComponent.propTypes = {
  // friendsList: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  isLoading: React.PropTypes.bool,
};
