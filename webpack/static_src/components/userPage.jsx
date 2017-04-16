import React, { Component } from 'react';
import { Media, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import PostComponent from './post';
import PostListComponent from './postList';


class UserPage extends Component {
  state = {
    userPostList: [],
    isLoading: true,
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/posts/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(promise => promise.json())
      .then((json) => {
        const list = json.map(
          post => (<PostComponent
            key={post.id}
            user={this.props.user}
            content={post.content}
            date={post.created}
          />),
      );

        this.setState({
          userPostList: list,
          isLoading: false,
        });
      });
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
          postList={this.state.userPostList}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

UserPage.propTypes = {
  id: PropTypes.number.isRequired,
  // user: PropTypes.shape({
  //   pk: PropTypes.number,
  //   username: PropTypes.string,
  //   avatar: PropTypes.string,
  //   first_name: PropTypes.string,
  //   last_name: PropTypes.string,
  // }).isRequired,
};

const mapStateToProps = (state, props) => ({
  user: state.users[props.id],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPage);
