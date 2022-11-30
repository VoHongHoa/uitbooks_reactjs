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
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-detail-blog"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          {blog && blog.title ? blog.title : ""}
        </ModalHeader>
        <ModalBody>
          <div className="scroller modalBody-product-container row">
            <div style={{ margin: "0 auto" }}>
              {blog && blog.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                ></div>
              )}
              <p>
                Tác giả:
                {blog && blog.user && blog.user.fullName
                  ? blog.user.fullName
                  : ""}
              </p>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
      <Button
        color="secondary"
        onClick={() => {
          this.toggle();
        }}
        className="px-3"
      >
        Đóng
      </Button>
    </ModalFooter> */}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailBlog);
