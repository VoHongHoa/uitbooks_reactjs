import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Select from "react-select";
import { handleSignUp } from "../../../services/userService";
import "./SignUp.scss";
import { toast } from "react-toastify";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NavLink } from "react-router-dom";
var mediumRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
var phoneRegex = new RegExp("^(?=.*[0-9])");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errEmail: true,
      password: "",
      passErr: true,
      repeatPassword: "",
      rpPassErr: true,
      userName: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      errPhone: true,
      img: "",
      gender: { value: "Nam", label: "Nam" },
    };
  }
  componentDidMount() {}
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      { value: "email", label: "Email" },
      { value: "fullName", label: "Họ và tên" },
      { value: "userName", label: "Tên đăng nhập" },
      { value: "gender", label: "Giới tính" },
      { value: "password", label: "Mật khẩu" },
      { value: "repeatPassword", label: "Mật khẩu lặp lại" },
      { value: "address", label: "Địa chỉ" },
      { value: "phoneNumber", label: "Số điện thoại" },
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // console.log(this.state[arrInput[i]]);
      if (!this.state[arrInput[i].value]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin: ${arrInput[i].label}`);
        break;
      }
    }
    return isValid;
  };
  handleOnchangeInput = (event, id) => {
    console.log(event);
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeImage = async event => {
    let filedata = event.target.files;
    let file = filedata[0];
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/user/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        err => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            console.log("check url", url);
            this.setState({
              img: url,
            });
          });
        }
      );
    }
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleCancelSignUp = () => {
    this.props.history.push("/");
  };
  handleSignUpUser = async () => {
    try {
      if (this.checkValidateInput()) {
        if (this.state.password === this.state.repeatPassword) {
          let data = {
            nameUser: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            address: this.state.address,
            telephone: this.state.phoneNumber,
            sex: this.state.gender.value,
            image: this.state.img,
            fullName: this.state.fullName,
          };
          let res = await handleSignUp(data);
          if (res) {
            toast.success("Đăng kí thành công! Vui lòng đăng nhập");
            this.props.history.push("/login");
          } else {
            toast.error("Đăng kí không thành công! Vui lòng kiểm tra lại");
          }
        } else {
          toast.error("Mật khẩu và mật khẩu lặp lại không trùng nhau!!!");
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi đăng kí!!");
    }
  };
  handleOnchangePassword = event => {
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
  handleOnchangeRepeat = event => {
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
  handleOnchangeEmail = event => {
    if (event.target.value.includes("@gmail.com")) {
      this.setState({
        email: event.target.value,
        errEmail: true,
      });
    } else {
      this.setState({
        errEmail: false,
      });
    }
  };
  handleOnchangePhoneNumber = event => {
    //console.log(event.target.value.charAt(0));
    let phoneNumber = event.target.value;
    //let isValid = true;
    for (let index = 0; index < phoneNumber.length; index++) {
      if (
        phoneNumber.charCodeAt(index) < 48 ||
        phoneNumber.charCodeAt(index) > 57
      ) {
        this.setState({
          errPhone: false,
        });
        break;
      } else {
        this.setState({
          errPhone: true,
          phoneNumber: phoneNumber,
        });
      }
    }
    if (
      event.target.value.length !== 10 ||
      event.target.value.charAt(0) !== "0"
    ) {
      this.setState({
        errPhone: false,
      });
      // } else {
      //   if (phoneRegex.test(event.target.value)) {
      //     this.setState({
      //       errPhone: true,
      //       phoneNumber: event.target.value,
      //     });
      //   } else {
      //     this.setState({
      //       errPhone: false,
      //     });
      //   }
    }
  };

  render() {
    const options = [
      { value: "Nam", label: "Nam" },
      { value: "Nữ", label: "Nữ" },
      { value: "Khác", label: "Khác" },
    ];
    return (
      <div className="sign-up-container container">
        <h1>Đăng kí</h1>
        <p>Điền đầy đủ thông tin để đăng kí tài khoản</p>
        <hr />
        <div className="row">
          <div className="col-6 emailInput">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập email"
              name="email"
              onChange={event => this.handleOnchangeEmail(event)}
            />
            <span
              className={this.state.errEmail === false ? "notice" : "no-notice"}
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
              placeholder="Nhập họ và tên"
              name="fullName"
              required
              onChange={event => this.handleOnchangeInput(event, "fullName")}
            />
          </div>
          <div className="col-6 nameInput mt-2">
            <label htmlFor="username">
              <b>Tên đăng nhập</b>
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="form-control"
              name="username"
              onChange={event => this.handleOnchangeInput(event, "userName")}
              required
            />
          </div>
          <div className="col-6 genderInput mt-2">
            <label htmlFor="gender">
              <b>Giới tính</b>
            </label>

            <Select
              type="text"
              options={options}
              onChange={this.handleOnchangeSelect}
              name={"gender"}
              value={this.state.gender}
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
              onChange={event => this.handleOnchangePassword(event)}
            />
            <span
              className={this.state.passErr === false ? "notice" : "no-notice"}
            >
              Mật khẩu có ít nhất 8 kí tự có chứa ít nhất: 1 kí tự in hoa, 1 kí
              tự thường, 1 kí tự đặc biệt!
            </span>
          </div>

          <div className="col-6 pswRepeat mt-2">
            <label htmlFor="psw-repeat">
              <b>Nhập lại mật khẩu</b>
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className="form-control"
              name="psw-repeat"
              onChange={event => this.handleOnchangeRepeat(event)}
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
          <div className="col-6 addressInput mt-2">
            <label htmlFor="address">
              <b>Địa chỉ</b>
            </label>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="form-control"
              name="address"
              onChange={event => this.handleOnchangeInput(event, "address")}
              required
            />
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
              onChange={event => this.handleOnchangePhoneNumber(event)}
              required
            />
            <span
              className={this.state.errPhone === false ? "notice" : "no-notice"}
            >
              Số điện thoại không hợp lệ
            </span>
          </div>
          <div className="col-6 imgInput mt-2">
            <label htmlFor="imgavatar">
              <b>Hình ảnh</b>
            </label>
            <input
              type="file"
              className="form-control"
              htmlFor="imgavatar"
              onChange={event => {
                this.handleOnchangeImage(event);
              }}
            />
            <div
              className="useravatar mt-2 mb-2"
              style={{
                backgroundImage: `url(${this.state.img})`,
                backgroundRepeat: "none",
                backgroundSize: "cover",
                width: "80px",
                height: "100px",
                backgroundPosition: "center",
                margin: "0 auto",
                border: " 1px solid black",
              }}
            ></div>
          </div>
        </div>

        <p>
          Các quy định của của hàng:{" "}
          <a href="/chinh-sach-bao-mat" style={{ color: "dodgerblue" }}>
            Quy định và Bảo mật
          </a>
          .
        </p>

        <div className="clearfix row">
          <button
            type="submit"
            className="signupbtn col-sm-6"
            onClick={() => this.handleSignUpUser()}
          >
            Đăng kí
          </button>
          <button
            type="button"
            className="cancelSignUpbtn col-sm-6"
            onClick={() => this.handleCancelSignUp()}
          >
            Hủy
          </button>
        </div>
        <div className="link-to-login">
          Bạn đã có tài khoản? <NavLink to={"/login"}>Đăng nhập</NavLink>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
