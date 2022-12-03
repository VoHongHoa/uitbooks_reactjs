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
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={logo} alt="Logo" className="avatar" />
        </div>

        <div className="container">
          <label htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Nhập email đã đăng kí để khôi phục lại mật khẩu"
            className="form-control mt-2"
            name="uname"
            onChange={(event) => this.handleOnchangeInput(event, "email")}
            required
          />

          <button type="submit" onClick={() => this.handleForgotPassword()}>
            Gửi yêu cầu
          </button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelForgotPassword()}
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
  connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
);
