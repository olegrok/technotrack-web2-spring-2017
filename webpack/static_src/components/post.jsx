import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';

class PostComponent extends Component {
  render() {
    return (
      <Row>
        <Panel
          header={this.props.author.username}
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
  author: React.PropTypes.shape({
    username: React.PropTypes.string,
    avatarUrl: React.PropTypes.string,
  }).isRequired,
  date: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
};

export default PostComponent;
