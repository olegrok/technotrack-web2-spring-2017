import React, { Component } from 'react';
import { Media, Well } from 'react-bootstrap';
import PostComponent from './post';
import PostListComponent from './postList';


export default class UserPage extends Component {
  state = {
    postList: [],
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
          post => <PostComponent
            key={post.id}
            user={this.props.user}
            content={post.content}
            date={post.created}
          />,
      );
        this.setState({
          postList: list,
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
          postList={this.state.postList}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

UserPage.propTypes = {
  user: React.PropTypes.shape({
    pk: React.PropTypes.number,
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
    first_name: React.PropTypes.string,
    last_name: React.PropTypes.string,
  }).isRequired,
};
