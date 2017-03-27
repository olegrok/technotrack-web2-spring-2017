import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';

class PostComponent extends Component {
  state = {
    user: {
      pk: 0,
      username: '',
      first_name: '',
      last_name: '',
      avatar: null,
    },
    date: '',
    content: '',
    title: '',
  }
  componentDidMount() {
    fetch(this.props.author,
      {
        method: 'GET',
        credentials: 'same-origin',
      })
    .then(promise => promise.json())
    .then((json) => {
      console.log(json);
      this.setState({
        user: json,
      });
    });
  }

  render() {
    return (
      <Row>
        <Panel
          header={this.props.title}
          footer={this.props.date}
          bsStyle="info"
        >
          {this.props.content}
        </Panel>
      </Row>
    );
  }
}

PostComponent.propTypes = {
  user: React.PropTypes.shape({
    pk: React.propTypes.number,
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
    first_name: React.PropTypes.string,
    last_name: React.PropTypes.string,
  }).isRequired,
  date: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default PostComponent;
