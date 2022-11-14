import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalDetailBlog.scss";
class ModalDetailBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.currentBlog !== this.props.currentBlog) {
      this.setState({
        blog: this.props.currentBlog,
      });
    }
  }
  toggle = () => {
    this.props.toggle();
  };
  render() {
    //console.log(this.state);
    let { blog } = this.state;
    //console.log(blog);
    return <div>Content HTML</div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailBlog);
