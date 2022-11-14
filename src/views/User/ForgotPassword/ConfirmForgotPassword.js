import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/img_avatar2.png";
import { withRouter } from "react-router";
import "./ForgotPassword.scss";
import { confirmChangeNewPassword } from "../../../services/userService";
import { toast } from "react-toastify";
var mediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_+])(?=.{8,})"
);
class ConfirmPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      token: "",
      password: "",
      passErr: true,
      repeatPassword: "",
      rpPassErr: true,
    };
  }
  componentDidMount() {
    this.setState({
      token: this.props.match.params.token,
      email: this.props.match.params.email,
    });
  }
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangePassword = (event) => {
    if (mediumRegex.test(event.target.value) === true) {
      this.setState({
        password: event.target.value,
        passErr: true,
      });
    } else {
      this.setState({
        passErr: false,
      });
    }
  };
  handleOnchangeRepeat = (event) => {
    if (this.state.password !== event.target.value) {
      this.setState({
        rpPassErr: false,
      });
    } else {
      this.setState({
        rpPassErr: true,
        repeatPassword: event.target.value,
      });
    }
  };
  handleConfirmPassword = async () => {
    try {
      let data = {
        email: this.state.email,
        password: this.state.password,
      };
      let res = await confirmChangeNewPassword(this.state.token, data);
      console.log(res);
      if (res === "successful") {
        toast.success("Thay đổi thành công!Vui lòng đăng nhập");
        this.props.history.push("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleCancelConfirmPassword = () => {
    this.props.history.push("/login");
  };
  render() {
    //  console.log(this.state);
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword)
);
