import React, { Component } from 'react';
import PostFormComponent from './postForm';
import PostListComponent from './postList';
import PostComponent from './post';

export default class PostListLayoutComponent extends Component {
  state = {
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
    postList: [],
    isLoading: true,
  };

  onCreate = (post) => {
    console.log(post);
    const postComponent =
      <PostComponent
        user={this.state.user}
        title={post.title}
        date={post.date}
        content={post.content}
      />;
    this.setState({
      postList: [postComponent, ...this.state.postList],
    });
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

    fetch('http://localhost:8080/api/events/?format=json',
      {
        method: 'GET',
        credentials: 'same-origin',
      })
          .then(promise => promise.json())
          .then((json) => {
            const list = json.map(
              post => <PostComponent
                key={post.id}
                author={post.author}
                title={post.title}
                content_object={post.content_object}
                date={post.created}
              />,
          );
            console.log(list);
            this.setState({
              postList: list,
              isLoading: false,
            });
          });
  }

  render() {
    return (
      <div>
        <PostFormComponent
          onCreate={this.onCreate}
          user={this.state.user}
        />
        <PostListComponent
          postList={this.state.postList}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  }
}

