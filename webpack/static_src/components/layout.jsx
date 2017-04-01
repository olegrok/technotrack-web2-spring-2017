/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import '../styles/bootstrap-3/css/bootstrap.css';
import NavbarTop from './navbarTop';
import NavbarLeft from './navbarLeft';
import PostListLayoutComponent from './postListLayout';

class LayoutComponent extends Component {
  state = {
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
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

  render() {
    return (
      <div>
        <NavbarTop user={this.state.user} />
        <Grid fluid>
          <NavbarLeft />
          <Col xs={12} md={8}>
            {/* <PostFormComponent
              onCreate={this.onCreate}
              username={this.state.user.username}
              avatar={this.state.user.avatar}
            />
            <PostListComponent
              isLoading={this.state.isLoading}
              postList={this.state.postList}
            /> */}
            { this.props.children }
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
