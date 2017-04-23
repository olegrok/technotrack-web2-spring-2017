import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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

PostListComponent.propTypes = {
  postList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  // postList: state.posts.postList,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostListComponent);
