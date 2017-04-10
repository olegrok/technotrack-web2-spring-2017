import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'material-ui/Avatar';

class ModalComponent extends Component {
  close = () => {
    this.props.onClickShow(false);
  }

  render() {
    let content;
    if (this.props.post.content_object.content) {
      content = this.props.post.content_object.content;
    } else {
      content = this.props.post.title;
    }
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.close}>
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
  showModal: PropTypes.boolean.isRequired,
  onClickShow: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => ({
  post: state.posts.posts[props.id],
  user: state.users[state.posts.posts[props.id].author],
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalComponent);
