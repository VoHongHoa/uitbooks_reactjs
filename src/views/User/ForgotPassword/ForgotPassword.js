import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/img_avatar2.png";
import { withRouter } from "react-router";
import { forgotPassword } from "../../../services/userService";
import "./ForgotPassword.scss";
import { toast } from "react-toastify";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  componentDidMount() {}
  handleCancelForgotPassword = () => {
    this.props.history.push("/login");
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleForgotPassword = async () => {
    try {
      let data = {
        email: this.state.email,
      };
      let res = await forgotPassword(data);
      console.log(res);
      if (res === "successful") {
        toast.success("Vui lòng kiểm tra email của bạn");
      } else {
        toast.error("Không tìm thấy email của bạn");
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
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
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
