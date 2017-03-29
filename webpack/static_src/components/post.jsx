import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';

class PostComponent extends Component {
  state = {
    author: '',
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: '../static/ava.jpg',
    },
    date: '',
    content_object: '',
    title: '',
  };

  componentDidMount() {
    fetch(this.props.content_object,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
    .then(promise => promise.json())
    .then((json) => {
      this.setState({
        content: json.content,
      });
    });

    fetch(this.props.author,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
    .then(promise => promise.json())
    .then((json) => {
      this.setState({
        user: json,
      });
    });
  }

  render() {
    return (
      <Row>
        <Panel
          header=<div><Avatar src={this.state.user.avatar} size={30} /> {this.props.title}</div>
          footer={this.props.date}
          bsStyle="info"
        >
          {this.state.content}
        </Panel>
      </Row>
    );
  }
}

PostComponent.propTypes = {
  author: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  content_object: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default PostComponent;
