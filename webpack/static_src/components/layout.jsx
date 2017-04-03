/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import '../styles/bootstrap-3/css/bootstrap.css';
import NavbarTop from './navbarTop';
import NavbarLeft from './navbarLeft';
import PostListLayoutComponent from './postListLayout';
import FriendListLayout from './friendList';
import UserPage from './userPage';
import ChatsListComponent from './chatsList';
import PeopleSearchComponent from './peopleSearch';

class LayoutComponent extends Component {
  state = {
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
    currentPageName: 'news',
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/users/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
        .then(promise => promise.json())
        .then((json) => {
          this.setState({
            user: json[0],
          });
        });
  }

  onCreate = (post) => {
    this.setState({
      postList: [post, ...this.state.postList],
    });
  };

  onMenuSelect = (currentMenu) => {
    this.setState({
      currentPageName: currentMenu,
    });
  };

  render() {
    let page = null;
    switch (this.state.currentPageName) {
      case 'news': page = <PostListLayoutComponent />;
        break;
      case 'mypage': page = <UserPage user={this.state.user} />;
        break;
      case 'friends': page = <FriendListLayout />;
        break;
      case 'chats': page = <ChatsListComponent />;
        break;
      case 'people': page = <PeopleSearchComponent />;
        break;
      default:
        page = <PostListLayoutComponent />;
    }

    return (
      <div>
        <NavbarTop user={this.state.user} />
        <Grid fluid>
          <NavbarLeft onSelect={this.onMenuSelect} />
          <Col xs={12} md={8}>
            { page }
          </Col>
        </Grid>
      </div>
    );
  }
}

LayoutComponent.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
};

export default LayoutComponent;
