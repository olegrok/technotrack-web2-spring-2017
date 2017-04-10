import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, Row, Panel } from 'react-bootstrap';

class PostFormComponent extends Component {
  state = {
    content: '',
  };

  onCreate = (e) => {
    e.preventDefault();
    this.props.onCreate({
      user: this.props.user,
      date: new Date().toString(),
      title: this.props.user.username + ' написал пост',
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
  onCreate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    pk: PropTypes.number,
    username: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default PostFormComponent;
