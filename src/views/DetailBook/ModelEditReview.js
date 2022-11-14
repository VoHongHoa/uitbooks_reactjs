import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModelEditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      commentId: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.review !== this.props.review) {
      this.setState({
        content: this.props.review.content,
        commentId: this.props.review.commentId,
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSubmitEdit = () => {
    let data = {
      content: this.state.content,
    };
    let commentId = this.state.commentId;
    console.log(data);
    this.props.doeditComment(commentId, data);
    this.setState({
      content: "",
      commentId: "",
    });
  };

  render() {
    let { content } = this.state;
    //console.log(review);
    return <div>Content HTML</div>;
  }
}

export default ModelEditReview;
