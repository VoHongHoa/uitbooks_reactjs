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
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={logo} alt="Logo" className="avatar" />
        </div>

        <div className="container">
          <div className="col-12 passwordInput mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu</b>
            </label>
            <input
              type="password"
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
              type="password"
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

          <button type="submit" onClick={() => this.handleConfirmPassword()}>
            Xác nhận
          </button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelConfirmPassword()}
          >
            Hủy
          </button>
        </div>
      </div>
    );
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
