import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../../assets/images/img_avatar2.png";
import { withRouter } from "react-router";
// import { handleLogin } from "../../../services/userService";
import "./Login.scss";
import { handleLoginRedux } from "../../../store/actions/AppAction";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { findUserByEmail, handleSignUp } from "../../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      isShowPassword: false,
    };
  }
  componentDidMount() {}
  handleCancelLogin = () => {
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
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["userName", "password"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  handleLogin = () => {
    if (this.checkValidateInput()) {
      let data = {
        nameUser: this.state.userName,
        password: this.state.password,
      };
      this.props.handleLoginRedux(data);
    }
  };
  handleForgotPassword = () => {
    this.props.history.push("/forgotpassword");
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  responseGoogle = async (response) => {
    console.log(response);
    if (response) {
      let userInfor = response.profileObj;
      let res = await findUserByEmail(userInfor.email);
      console.log(res);
      if (res.length === 0) {
        this.setState({
          userName: userInfor.email,
          password: process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD,
        });
        let data = {
          email: userInfor.email,
          password: process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD,
          nameUser: userInfor.email,
          fullName: userInfor.name,
          sex: "Nam",
          image: userInfor.imageUrl,
        };
        await handleSignUp(data);
        this.handleLogin();
      } else {
        this.setState({
          userName: res[0].nameUser,
          password: process.env.REACT_APP_DEFAULT_GOOGLE_PASSWORD,
        });
        this.handleLogin();
      }
    } else {
      toast.error("Đăng nhập không thành công!!");
    }
  };
  responseFailGoogle = (response) => {
    console.log(response);
  };
  render() {
    return (
      <div className="logincontainer">
        <div className="imgcontainer">
          <img src={logo} alt="Logo" className="avatar" />
        </div>
        <div className="container">
          <label htmlFor="uname">
            <b>Tên đăng nhập</b>
          </label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập"
            className="form-control"
            name="uname"
            onChange={(event) => this.handleOnchangeInput(event, "userName")}
            required
          />
          <div className="form-group mt-2">
            <label htmlFor="psw">
              <b>Mật khẩu</b>
            </label>
            <input
              type={this.state.isShowPassword === true ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              onChange={(event) => this.handleOnchangeInput(event, "password")}
              className="form-control"
              name="psw"
              required
            />
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

          <button
            type="submit"
            onClick={() => this.handleLogin()}
            className="mb-3"
          >
            Đăng nhập
          </button>
          <p style={{ textAlign: "center" }}>Hoặc</p>

          <GoogleLogin
            clientId="1000261381053-acnpjvmhm485p7aal87iicf70bvdm04a.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className=" btn btn-primary button-login-google"
                style={{ cursor: "pointer" }}
              >
                <i className="fa-brands fa-google"></i> Đăng nhập bằng Google
              </button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseFailGoogle}
            cookiePolicy={"single_host_origin"}
          />
          {/* <label>
            <input type="checkbox" checked="checked" name="remember" />
            Lưu thông tin
          </label> */}
          <div className="link-to-signup">
            Bạn chưa có tài khoản? <NavLink to={"/sign-up"}>Đăng kí</NavLink>
          </div>
        </div>
        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          <button
            type="button"
            className="cancelbtn"
            onClick={() => this.handleCancelLogin()}
          >
            Hủy
          </button>

          <span className="psw" onClick={() => this.handleForgotPassword()}>
            <a href="#">Quên mật khẩu?</a>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return { handleLoginRedux: (data) => dispatch(handleLoginRedux(data)) };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
