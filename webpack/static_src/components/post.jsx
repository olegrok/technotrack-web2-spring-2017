import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';

class PostComponent extends Component {
  state = {
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: '../media/avatars/SH.jpg',
    },
    date: '',
    content_object: '',
    title: '',
  };

  componentDidMount() {
    if (this.props.content_object) {
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
    } else {
      this.setState({
        content: this.props.content,
      });
    }
    this.setState({
      date: this.props.date,
      title: this.props.title,
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
      <div>
        <Row>
          <Panel
            header=<div><Avatar src={this.state.user.avatar} size={30} /> {this.state.title}</div>
            footer={this.state.date}
            bsStyle="info"
          >
            {this.state.content}
          </Panel>
        </Row>
      </div>
    )
  }
}

PostComponent.propTypes = {
  author: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  content: React.PropTypes.string,
  content_object: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};

PostComponent.defaultProp = {
  content: '',
  content_object: '',
};

export default PostComponent;
