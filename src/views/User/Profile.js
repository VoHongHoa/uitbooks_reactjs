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
    return <div>Content HTML</div>;
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
