import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import PostFormComponent from './postForm';
import PostListComponent from './postList';
import PostComponent from './post';
import { fetchPosts } from '../actions/posts';

class PostListLayoutComponent extends Component {
  state = {
    postList: [],
  };

  onCreate = (post) => {
    const postComponent =
      (<PostComponent
        user={this.props.profile}
        title={post.title}
        date={post.date}
        content={post.content}
      />);
    this.setState({
      postList: [postComponent, ...this.state.postList],
    });
  };

  componentDidMount() {
    this.props.fetchPosts();
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
  isLoading: state.posts.isLoading,
  profile: state.layout.account,
  postList: state.posts.postList,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    fetchPosts,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostListLayoutComponent);
