import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  toggle = () => {
    this.props.toggle();
  };
  handleDelete = () => {
    this.props.handleDeleteUser(this.props.currentUserEdit.userId);
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenPopup}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="md"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <p style={{ color: "red" }}>Cảnh báo</p>
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <p style={{ textAlign: "center" }}>
              Bạn có muốn xóa mọi thông tin liên quan đến người dùng{" "}
              <strong>{this.props.currentUserEdit.fullName}</strong> hay không?
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleDelete()}
          >
            Xóa
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Popup;
