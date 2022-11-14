import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { changePassword } from "../../../services/userService";
import { logOutSuccess } from "../../../store/actions/AppAction";
import "./ChangePassword.scss";
var mediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPassword: "",
      newPassword: "",
      errPass: true,
      repeatNewPassword: "",
      errRepeat: true,
      isShowPassword: false,
    };
  }
  componentDidMount() {}
  handleCancelChangePassword = () => {
    this.props.history.push("/");
    // console.log(this.props.history);
  };
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
        newPassword: event.target.value,
        passErr: true,
      });
    } else {
      this.setState({
        passErr: false,
      });
    }
  };
  handleOnchangeRepeat = (event) => {
    if (this.state.newPassword !== event.target.value) {
      this.setState({
        rpPassErr: false,
      });
    } else {
      this.setState({
        rpPassErr: true,
        repeatNewPassword: event.target.value,
      });
    }
  };
  handleChangePassword = async () => {
    try {
      if (this.state.newPassword === this.state.repeatNewPassword) {
        let data = {
          oldPassword: this.state.curentPassword,
          newPassword: this.state.newPassword,
        };
        let res = await changePassword(data);
        //console.log(res);
        if (res !== "mat khau cu sai") {
          toast.success("Thay đổi mật khẩu thành công! Vui lòng đăng nhập lại");
          this.props.logOutUser();
        } else {
          toast.error("Mật khẩu cũ không chính xác!");
        }
      }
    } catch (e) {
      toast.error("Lỗi sever!");
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutSuccess()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
);
