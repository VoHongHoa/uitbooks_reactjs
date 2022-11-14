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
    return <div>Content HTML</div>;
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
