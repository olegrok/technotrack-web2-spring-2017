import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalComponent from './modal';
import { showModal } from '../actions/posts';

class UserPostComponent extends Component {
  render() {
    let headerTag = null; // <Avatar src={this.props.author.avatar} size={30} />;
    return (
      <div>
        {/* <ModalComponent
          showModal={this.props.modal}
          onClickShow={this.showModal}
          id={this.props.id}
        /> */}
        <Row>
          <Panel
            onDoubleClick={() => this.props.showModal(this.props.id, true)}
            header={headerTag}
            footer={this.props.date}
            bsStyle="info"
          >
            {this.props.content}
          </Panel>
        </Row>
      </div>
    );
  }
}

UserPostComponent.propTypes = {
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  author: state.users[state.userPosts.posts[props.id].author],
  content: state.userPosts.posts[props.id].content,
  date: state.userPosts.posts[props.id].created,
  title: state.userPosts.posts[props.id].title,
  modal: state.userPosts.posts[props.id].modal,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
    showModal,
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPostComponent);
