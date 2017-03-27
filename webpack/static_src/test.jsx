/* global document: true */
/* global window: true */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './styles/bootstrap-3/css/bootstrap.css';

import NavbarTop from './components/navbarTop';
import NavbarLeft from './components/navbarLeft';
import PostFormComponent from './components/postForm';
import PostListComponent from './components/postList';

class Page extends Component {
  state = {
    postList: [],
    isLoading: true,
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
  }

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

    fetch('http://localhost:8080/api/events/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
    .then(promise => promise.json())
    .then((json) => {
      this.setState({
        postList: json,
        isLoading: false,
      });
    });

    // window.setTimeout(
    //   () => {
    //     this.setState(
    //       { postList: POST_LIST,
    //         isLoading: false,
    //       });
    //   },
    //   1000
    // );
  }

  onCreate = (post) => {
    this.setState({
      postList: [post, ...this.state.postList],
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavbarTop user={this.state.user} />
          <Grid fluid>
            <NavbarLeft />
            <Col xs={12} md={8}>
              <PostFormComponent onCreate={this.onCreate} />
              <PostListComponent
                isLoading={this.state.isLoading}
                postList={this.state.postList}
              />
            </Col>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
