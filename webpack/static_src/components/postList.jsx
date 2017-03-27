import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import PostComponent from './post';


class PostListComponent extends Component {
  render() {
    // if (this.props.postList.length === 0) {
    //   return null;
    // }

    const list = this.props.postList.map(
      post => <PostComponent
        key={post.id}
        author={post.author}
        title={post.title}
        content={post.content}
        date={post.created}
      />,
    );
    return (
      <div>{ this.props.isLoading ?
        <CircularProgress size={60} thickness={7} /> : list
      }
      </div>
    );
  }
}
PostListComponent.defaultProps = {
  isLoading: true,
};

PostListComponent.propTypes = {
  postList: React.PropTypes.arrayOf(React.PropTypes.shape({
    author: React.PropTypes.shape({
      username: React.PropTypes.string,
      avatarUrl: React.PropTypes.string,
    }).isRequired,
    date: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired,
  })).isRequired,
  isLoading: React.PropTypes.bool,
};

export default PostListComponent;
