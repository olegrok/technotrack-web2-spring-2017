import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModalComponent from './modal';

class PostComponent extends Component {
  state = {
    showModal: false,
  };

  showModal = (op) => {
    this.setState({
      showModal: op,
    });
  }

  render() {
    let headerTag = null;
    if (this.props.title) {
      headerTag = <div><Avatar src={this.props.author.avatar} size={30} /> {this.props.title}</div>;
    }
    return (
      <div>
        <ModalComponent
          showModal={this.state.showModal}
          onClickShow={this.showModal}
          id={this.props.id}
        />
        <Row>
          <Panel
            onDoubleClick={() => this.showModal(true)}
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

PostComponent.propTypes = {
  id: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  author: state.users[state.posts.posts[props.id].author],
  content: state.posts.posts[props.id].content_object.content,
  date: state.posts.posts[props.id].created,
  title: state.posts.posts[props.id].title,
  content_object: state.posts.posts[props.id].content_object,
});

const mapDispatchToProps = distpatch => ({
  ...bindActionCreators({
  }, distpatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostComponent);
