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
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={this.props.userInfor.image} alt="Logo" className="avatar" />
        </div>

        <div className="container">
          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu hiện tại</b>
            </label>
            <input
              type={this.state.isShowPassword === true ? "text" : "password"}
              placeholder="Mật khẩu hiện tại"
              onChange={(event) =>
                this.handleOnchangeInput(event, "curentPassword")
              }
              className="form-control"
              name="psw"
              required
            />
          </div>

          <div className="col-12 passwordInput mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu</b>
            </label>
            <input
              type={this.state.isShowPassword === true ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="form-control"
              name="psw"
              onChange={(event) => this.handleOnchangePassword(event)}
            />
            <span
              className={this.state.passErr === false ? "notice" : "no-notice"}
            >
              Mật khẩu có ít nhất 8 kí tự có chứa ít nhất: 1 kí tự in hoa, 1 kí
              tự thường, 1 kí tự đặc biệt!
            </span>
          </div>

          <div className="col-12 pswRepeat mt-2">
            <label htmlFor="psw-repeat">
              <b>Nhập lại mật khẩu</b>
            </label>
            <input
              type={this.state.isShowPassword === true ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="form-control"
              name="psw-repeat"
              onChange={(event) => this.handleOnchangeRepeat(event)}
              required
            />
            <span
              className={
                this.state.rpPassErr === false ? "notice" : "no-notice"
              }
            >
              Mật khẩu không trùng khớp!
            </span>
          </div>

          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={this.state.isShowPassword}
              id="rememberPasswordCheck"
              onChange={() => this.handleShowHidePassword()}
            />
            <label className="form-check-label" htmlFor="rememberPasswordCheck">
              Hiển thị mật khẩu
            </label>
          </div>

          <button type="submit" onClick={() => this.handleChangePassword()}>
            Thay đổi
          </button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelChangePassword()}
          >
            Hủy
          </button>
        </div>
      </div>
    );
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
