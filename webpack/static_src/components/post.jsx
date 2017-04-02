import React, { Component } from 'react';
import { Panel, Row } from 'react-bootstrap';
import Avatar from 'material-ui/Avatar';
import ModalComponent from './modal';

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
    showModal: false,
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

    if (this.props.author) {
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
    } else {
      this.setState({
        user: this.props.user,
      });
    }
  }

  showModal = (op) => {
    this.setState({
      showModal: op,
    });
  }

  render() {
    let headerTag = null;
    if (this.state.title) {
      headerTag = <div><Avatar src={this.state.user.avatar} size={30} /> {this.state.title}</div>;
    }
    return (
      <div>
        <ModalComponent
          showModal={this.state.showModal}
          onClickShow={this.showModal}
          user={this.state.user}
          content={this.state.content}
          date={this.state.date}
        />
        <Row>
          <Panel
            onDoubleClick={() => this.showModal(true)}
            header={headerTag}
            footer={this.state.date}
            bsStyle="info"
          >
            {this.state.content}
          </Panel>
        </Row>
      </div>
    );
  }
}

PostComponent.defaultProps = {
  content: '',
  content_object: '',
  author: '',
  user: {
    pk: 0,
    username: '',
    first_name: '',
    last_name: '',
    avatar: '../media/avatars/SH.jpg',
  },
  title: '',
};

PostComponent.propTypes = {
  author: React.PropTypes.string,
  user: React.PropTypes.shape({
    pk: React.PropTypes.number,
    username: React.PropTypes.string,
    avatar: React.PropTypes.string,
  }),
  date: React.PropTypes.string.isRequired,
  content: React.PropTypes.string,
  content_object: React.PropTypes.string,
  title: React.PropTypes.string,
};


export default PostComponent;
