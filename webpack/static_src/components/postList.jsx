import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class PostListComponent extends Component {
  render() {
    return (
      <div> { this.props.isLoading ?
        <CircularProgress size={60} thickness={7} /> : this.props.postList
      }
      </div>
    );
  }
}
PostListComponent.defaultProps = {
  isLoading: true,
};

PostListComponent.propTypes = {
  postList: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
  isLoading: React.PropTypes.bool,
};

export default PostListComponent;
