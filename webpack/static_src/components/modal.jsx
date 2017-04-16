import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';
import { showModal } from '../actions/posts';

class ModalComponent extends Component {
  render() {
    let content;
    if (this.props.post.content_object.content) {
      content = this.props.post.content_object.content;
    } else {
      content = this.props.post.title;
    }
    return (
      <div>
        <Modal show={this.props.post.modal} onHide={() => this.props.showModal(this.props.id, false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Avatar src={this.props.user.avatar} size={50} />
              {this.props.user.username}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content}
          </Modal.Body>
          <Modal.Footer>
            {this.props.post.created}
            {/* <Button onClick={this.close}>X</Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  id: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  post: state.posts.posts[props.id],
  user: state.users[state.posts.posts[props.id].author],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    showModal,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalComponent);
