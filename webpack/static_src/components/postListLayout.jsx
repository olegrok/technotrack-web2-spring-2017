import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import PostFormComponent from './postForm';
import PostListComponent from './postList';
import PostComponent from './post';
import { loadPosts, loadPostsSuccess, loadPostsFail } from '../actions/posts';


class PostListLayoutComponent extends Component {
  state = {
    postList: [],
    isLoading: true,
  };

  onCreate = (post) => {
    const postComponent =
      <PostComponent
        user={this.props.profile}
        title={post.title}
        date={post.date}
        content={post.content}
      />;
    this.setState({
      postList: [postComponent, ...this.state.postList],
    });
  };

  componentDidMount() {
    this.props.loadPosts();
    fetch('http://localhost:8080/api/events/',
      {
        method: 'GET',
        credentials: 'same-origin',
        body: {
          format: 'json',
        },
      })
      .then(promise => promise.json())
      .then((json) => {
        this.props.loadPostsSuccess(json);
      });
  }

  render() {
    return (
      <div>
        <PostFormComponent
          onCreate={this.onCreate}
          user={this.props.profile}
        />
        <PostListComponent
          postList={this.props.postList}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postIds: state.posts.postIds,
  isLoading: state.posts.isLoading,
  profile: state.layout.account,
  postList: state.layout.postList,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    loadPosts,
    loadPostsSuccess,
    loadPostsFail,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostListLayoutComponent);
