import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getAllUser,
  deleteUser,
  getAllUserByLibrarian,
  deleteUserByLibrarian,
  updateUserRoleByAdmin,
  searchUser,
  searchUserBySeller,
} from "../../../services/userService";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import "./UserManage.css";
import ModalAddNewUser from "./ModalAddNewUser";
import { handleSignUp } from "../../../services/userService";
import Popup from "../../../components/Popup";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUser: 0,
      allUser: [],
      numOfPage: 0,
      currentPage: 0,
      isOpenModal: false,
      currentUserEdit: {},
      action: "",
      isOpenPopup: false,
      keyword: "",
      action: "",
    };
  }
  checkAdminOrSeller = () => {
    let isValid = true; // admin: true , seller: false
    if (
      this.props.userInfor &&
      this.props.userInfor.role?.nameRole === "SELLER"
    ) {
      isValid = false;
    }
    return isValid;
  };
  getUserPaging = async (currentPage) => {
    try {
      let res;
      if (this.checkAdminOrSeller()) {
        res = await getAllUser(currentPage);
      } else {
        res = await getAllUserByLibrarian(currentPage);
      }
      if (res) {
        let numOfPage = 0;
        if (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN === 0) {
          numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_ADMIN;
        } else {
          numOfPage =
            (res.count -
              (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN)) /
              process.env.REACT_APP_PAGING_LIMIT_ADMIN +
            1;
        }
        this.setState({
          numOfUser: res.count,
          allUser: res.userList,
          numOfPage: numOfPage,
        });
      } else {
        this.setState({
          ...this.state,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  componentDidMount() {
    this.getUserPaging(0);
  }
  handleChangePage = (item) => {
    this.getUserPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  toggle = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  togglePopup = () => {
    this.setState({
      isOpenPopup: false,
    });
  };
  handleDeleteUser = async (userId) => {
    try {
      let res;
      if (this.checkAdminOrSeller()) {
        res = await deleteUser(userId);
      } else {
        res = await deleteUserByLibrarian(userId);
      }
      if (res) {
        toast.success("Xóa thành công!");
        this.setState({
          currentPage: 0,
          isOpenPopup: false,
        });
      } else {
        toast.error("Xóa không thành công");
      }
      this.getUserPaging(0);
    } catch (e) {
      toast.error("Xóa không thành công!!!");
    }
  };
  handleOpenModal = () => {
    this.setState({
      isOpenModal: true,
      action: "ADD_NEW_USER",
    });
  };
  doAddNewUser = async (data) => {
    let res = await handleSignUp(data);
    if (res) {
      this.setState({
        isOpenModal: false,
      });
      toast.success("Thêm thành công !!!");
      this.getUserPaging(0);
    } else {
      toast.error("Thêm thất bại!Vui lòng kiểm tra lại");
    }
  };
  doEditRoleUser = async (data, userId) => {
    let res = await updateUserRoleByAdmin(data, userId);
    console.log(res);
    if (res === "successful") {
      this.setState({
        isOpenModal: false,
      });
      toast.success("Chỉnh sửa thành công");
      this.getUserPaging(0);
    } else {
      toast.error("Chỉnh sửa thất bại");
    }
  };
  handleEditUser = (item) => {
    this.setState({
      action: "EDIT_USER",
      isOpenModal: true,
      currentUserEdit: item,
    });
  };
  handleOpenPopup = (item) => {
    this.setState({
      isOpenPopup: true,
      currentUserEdit: item,
    });
  };
  handleOnchangeInput = async (event) => {
    this.setState({
      keyword: event.target.value,
      action: "SEARCH",
    });
    try {
      let res;
      if (event.target.value === "") {
        this.getUserPaging(0);
        this.setState({
          action: "",
        });
      }
      let data = {
        keyword: event.target.value,
      };
      if (this.checkAdminOrSeller()) {
        res = await searchUser(data);
      } else {
        res = await searchUserBySeller(data);
      }
      //console.log(res);
      if (res) {
        this.setState({
          allUser: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { numOfPage, allUser, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(arr);
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserManage)
);
