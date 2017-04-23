import React, { Component } from 'react';
import { Media, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import PostListComponent from './postList';
import { fetchUserPosts } from '../actions/userPosts';

class UserPage extends Component {
  state = {
    userPostList: [],
    isLoading: true,
  };

  componentDidMount() {
    this.props.fetchUserPosts(this.props.user.id);
  }

  render() {
    let userFirstName = null;
    let userLastName = null;
    if (this.props.user.first_name) {
      userFirstName = <p><strong>Имя: </strong> {this.props.user.first_name}</p>;
    }
    if (this.props.user.last_name) {
      userLastName = <p><strong>Фамилия: </strong> {this.props.user.last_name}</p>;
    }

    return (
      <div>
        <Well>
          <Media>
            <Media.Left>
              <img width={128} height={128} src={this.props.user.avatar} alt="Avatar" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.user.username}</Media.Heading>
              <br />
              {userFirstName}
              {userLastName}
            </Media.Body>
          </Media>
        </Well>
        <PostListComponent
          postList={this.props.userPostList}
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

UserPage.propTypes = {
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users[props.id],
  userPostList: state.userPosts.userPostList,
  isLoading: state.userPosts.isLoading,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    fetchUserPosts,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
