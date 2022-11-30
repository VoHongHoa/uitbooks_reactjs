import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { editUser, editUserAvatar } from "../../store/actions/AppAction";
import HomeHeader from "../Homepage/HomeHeader";
import avatar from "../../assets/images/avatar.jpg";
import "./Profile.css";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Footer from "../Homepage/Footer";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      img: "",
      gender: "",
      userId: "",
    };
  }
  componentDidMount() {
    if (this.props.userInfor) {
      this.setState({
        email: this.props.userInfor.email,
        userName: this.props.userInfor.nameUser,
        fullName: this.props.userInfor.fullName,
        address: this.props.userInfor.address,
        phoneNumber: this.props.userInfor.telephone,
        img: this.props.userInfor.image,
        gender: this.props.userInfor.sex,
        userId: this.props.userInfor.userId,
      });
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.userInfor !== this.props.userInfor) {
      this.setState({
        email: this.props.userInfor.email,
        userName: this.props.userInfor.nameUser,
        fullName: this.props.userInfor.fullName,
        address: this.props.userInfor.address,
        phoneNumber: this.props.userInfor.telephone,
        img: this.props.userInfor.image,
        gender: this.props.userInfor.sex,
        userId: this.props.userInfor.userId,
      });
    }
  }
  handleCancelProfile = () => {
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
  handleChangeProfile = () => {
    let data = {
      userId: this.state.userId,
      nameUser: this.state.userName,
      email: this.state.email,
      address: this.state.address,
      telephone: this.state.phoneNumber,
      sex: this.state.gender,
      fullName: this.state.fullName,
    };
    this.props.editUser(data);
  };

  handleOnchangeAvatar = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/user/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("check url", url);
            let data = {
              image: url,
            };
            this.props.editUserAvatar(data);
          });
        }
      );
    }
  };
  render() {
    return (
      <>
        <HomeHeader />
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <form>
                  <div className="input-file-container">
                    <input
                      className="input-file"
                      id="my-file"
                      type="file"
                      onChange={(event) => this.handleOnchangeAvatar(event)}
                    />
                    <label
                      tabIndex="0"
                      htmlFor="my-file"
                      className="input-file-trigger"
                    >
                      Thay đổi avatar
                    </label>
                  </div>
                  <p className="file-return"></p>
                </form>
                {this.state.img ? (
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    height="150px"
                    src={this.state.img}
                    alt="Avatar"
                  />
                ) : (
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    height="150px"
                    src={avatar}
                    alt="Avatar"
                  />
                )}

                <span className="font-weight-bold">{this.state.userName}</span>
                <span className="text-black-50">{this.state.email}</span>
                <span> </span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Cài đặt hồ sơ</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      defaultValue={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      defaultValue={this.state.email}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "email")
                      }
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số điện thoại"
                      defaultValue={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "phoneNumber")
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ"
                      defaultValue={this.state.address}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "address")
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">Giới tính</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Giới tính"
                      defaultValue={this.state.gender}
                      onChange={(event) =>
                        this.handleOnchangeInput(event, "gender")
                      }
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => this.handleChangeProfile()}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch(editUser(data)),
    editUserAvatar: (data) => dispatch(editUserAvatar(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
