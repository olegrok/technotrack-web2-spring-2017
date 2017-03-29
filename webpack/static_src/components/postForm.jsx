import React, { Component } from 'react';
import { Button, Form, FormControl, Row, Panel } from 'react-bootstrap';

class PostFormComponent extends Component {
  state = {
    content: '',
  };

  onCreate = (e) => {
    e.preventDefault();
    this.props.onCreate({
      author: {
        username: this.props.username,
        avatarUrl: this.props.avatar,
      },
      ...this.state,
    });
    this.setState({
      content: '',
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Row><Panel>
        <Form horizontal>
          <FormControl
            type="text"
            componentClass="textarea"
            placeholder="Enter your news"
            value={this.state.content}
            onChange={this.onChange}
            name="content"
          />
          <div>
            <Button
              type="submit"
              bsStyle="primary"
              bsSize="default"
              onClick={this.onCreate}
            >
                Send
            </Button>
          </div>
        </Form>
      </Panel></Row>
    );
  }
}

PostFormComponent.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
  avatar: React.PropTypes.string.isRequired,
};

export default PostFormComponent;
