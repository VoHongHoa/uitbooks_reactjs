import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import "./ModalAddNewUser.scss";
import { getAllCategoriesBooksRedux } from "../../../store/actions/CategoriesAction";
import { ROLE_OPTIONS } from "../../../constants/constants";
var mediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
var phoneRegex = new RegExp("^(?=.*[0-9])");

class ModalAddNewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: "",
      errEmail: true,
      password: "",
      passErr: true,
      userName: "",
      fullName: "",
      phoneNumber: "",
      errPhone: true,
      role: {
        value: "ADMIN",
        label: "ADMIN",
      },
      action: "ADD_NEW_USER",
    };
  }
  componentDidMount() {
    this.props.getAllCategoriesBooksRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.action !== this.props.action) {
      this.setState({
        action: this.props.action,
      });
      if (this.props.action === "ADD_NEW_USER") {
        this.setState({
          email: "",
          errEmail: true,
          password: "",
          passErr: true,
          userName: "",
          fullName: "",
          phoneNumber: "",
          errPhone: true,
          role: {
            value: "ADMIN",
            label: "ADMIN",
          },
          action: "ADD_NEW_USER",
        });
      }
    }
    if (prevProps.currentUserEdit !== this.props.currentUserEdit) {
      console.log(this.props.currentUserEdit);
      this.setState({
        userId: this.props.currentUserEdit.userId,
        email: this.props.currentUserEdit.email,
        errEmail: true,
        password: "1",
        passErr: true,
        userName: this.props.currentUserEdit.nameUser,
        fullName: this.props.currentUserEdit.fullName,
        phoneNumber: this.props.currentUserEdit.telephone,
        errPhone: true,
        role: {
          value: this.props.currentUserEdit.role.nameRole,
          label: this.props.currentUserEdit.role.nameRole,
        },
      });
    }
  }
  toggle = () => {
    this.props.toggle();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleSubmitAdd = () => {
    if (
      this.state.errEmail === true &&
      this.state.errPhone === true &&
      this.state.passErr === true &&
      this.state.action === "ADD_NEW_USER"
    ) {
      let data = {
        email: this.state.email,
        fullName: this.state.fullName,
        nameUser: this.state.userName,
        password: this.state.password,
        telephone: this.state.phoneNumber,
        role: {
          roleId: this.state.role.value,
          nameRole: this.state.role.value,
        },
      };
      this.props.doAddNewUser(data);
    }
    if (this.state.action === "EDIT_USER") {
      let data = {
        roleName: this.state.role.value,
      };
      let userId = this.state.userId;
      console.log(data, userId);
      this.props.doEditRoleUser(data, userId);
    }
  };

  handleOnchangePassword = (event) => {
    let password = event.target.value;
    this.setState({
      password: password,
    });
    if (mediumRegex.test(password) === true) {
      this.setState({
        password: password,
        passErr: true,
      });
    } else {
      this.setState({
        passErr: false,
      });
    }
  };
  handleOnchangeEmail = (event) => {
    let email = event.target.value;
    this.setState({
      email: email,
    });
    if (email.includes("@gmail.com")) {
      this.setState({
        errEmail: true,
      });
    } else {
      this.setState({
        errEmail: false,
      });
    }
  };
  handleOnchangePhoneNumber = (event) => {
    // console.log(event.target.value.charAt(0));
    let phoneNumber = event.target.value;
    this.setState({
      phoneNumber: phoneNumber,
    });
    if (phoneNumber.length !== 10 || phoneNumber.charAt(0) !== "0") {
      this.setState({
        errPhone: false,
      });
    } else {
      if (phoneRegex.test(phoneNumber)) {
        this.setState({
          errPhone: true,
          phoneNumber: phoneNumber,
        });
      } else {
        this.setState({
          errPhone: false,
        });
      }
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModal}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          {this.state.action === "ADD_NEW_USER"
            ? "Thêm mới người dùng"
            : "Chỉnh sửa người dùng"}
        </ModalHeader>
        <ModalBody>
          <div className="modalBody-product-container row">
            <div className="col-6 emailInput">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email"
                name="email"
                onChange={(event) => this.handleOnchangeEmail(event)}
                readOnly={this.state.action === "EDIT_USER" ? true : false}
                value={this.state.email}
              />
              <span
                className={
                  this.state.errEmail === false ? "notice" : "no-notice"
                }
              >
                Email phải có định dạng: *@gmail.com
              </span>
            </div>
            <div className="col-6 fullNameInput">
              <label htmlFor="fullName">
                <b>Họ và tên</b>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Họ và tên"
                name="fullName"
                required
                readOnly={this.state.action === "EDIT_USER" ? true : false}
                onChange={(event) =>
                  this.handleOnchangeInput(event, "fullName")
                }
                value={this.state.fullName}
              />
            </div>
            <div className="col-6 nameInput mt-2">
              <label htmlFor="username">
                <b>Tên đăng nhập</b>
              </label>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="form-control"
                name="username"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "userName")
                }
                required
                value={this.state.userName}
                readOnly={this.state.action === "EDIT_USER" ? true : false}
              />
            </div>

            <div className="col-6 passwordInput mt-2">
              <label htmlFor="psw">
                <b>Mật khẩu</b>
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="form-control"
                name="psw"
                onChange={(event) => this.handleOnchangePassword(event)}
                value={this.state.password}
                readOnly={this.state.action === "EDIT_USER" ? true : false}
              />
              <span
                className={
                  this.state.passErr === false ? "notice" : "no-notice"
                }
              >
                Mật khẩu có ít nhất 8 kí tự có chứa ít nhất: 1 kí tự in hoa, 1
                kí tự thường, 1 kí tự đặc biệt!
              </span>
            </div>

            <div className="col-6 phonenumberInput mt-2">
              <label htmlFor="phonenumber">
                <b>Số điện thoại</b>
              </label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                className="form-control"
                name="phonenumber"
                onChange={(event) => this.handleOnchangePhoneNumber(event)}
                value={this.state.phoneNumber}
                readOnly={this.state.action === "EDIT_USER" ? true : false}
                required
              />
              <span
                className={
                  this.state.errPhone === false ? "notice" : "no-notice"
                }
              >
                Số điện thoại không hợp lệ
              </span>
            </div>
            <div className="col-6 genderInput mt-2">
              <label htmlFor="gender">
                <b>Vai trò</b>
              </label>

              <Select
                type="text"
                options={ROLE_OPTIONS}
                onChange={this.handleOnchangeSelect}
                name={"role"}
                value={this.state.role}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSubmitAdd()}
          >
            {this.state.action === "ADD_NEW_USER" ? "Thêm" : "Lưu thay đổi"}
          </Button>{" "}
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

const mapStateToProps = (state) => {
  return { allCategoriesBooks: state.books.allCategoriesBooks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategoriesBooksRedux: () => dispatch(getAllCategoriesBooksRedux()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddNewBook);
