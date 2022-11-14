import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import "./CategoriesBook.scss";
import {
  deleteOrder,
  deleteOrderBySeller,
  getAllOrder,
  getAllOrderBySeller,
  getDetailOrderById,
  getDetailOrderBySeller,
  searchorderByAdmin,
  searchorderBySeller,
  updateStatusOrder,
  updateStatusOrderBySeller,
} from "../../../services/OrderService";
import moment from "moment";
import ModalViewDetailOrder from "./ModalViewDetailOrder";
class OrderManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfUser: 0,
      allOrder: [],
      numOfPage: 0,
      currentPage: 0,
      isOpenModalView: false,
      detailOrder: [],
      curentOrder: {},
      keyword: "",
      action: "",
    };
  }
  checkAdminOrLibrarian = () => {
    let isValid = true; // admin: true , librarian: false
    if (
      this.props.userInfor &&
      this.props.userInfor.role.nameRole === "SELLER"
    ) {
      isValid = false;
    }
    return isValid;
  };
  getOrderPaging = async (currentPage) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await getAllOrder(currentPage);
      } else {
        res = await getAllOrderBySeller(currentPage);
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
          allOrder: res.orderssList,
          numOfPage: numOfPage,
        });
      } else {
        this.setState({
          ...this.state,
        });
      }
    } catch (e) {
      toast.error("Lỗi server");
    }
  };
  componentDidMount() {
    this.getOrderPaging(0);
  }
  handleChangePage = (item) => {
    this.getOrderPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteOrder = async (orderssId) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await deleteOrder(orderssId);
      } else {
        res = await deleteOrderBySeller(orderssId);
      }
      console.log(res);
      if (res === "successful") {
        toast.success("Xóa thành công!");
        this.getOrderPaging(0);
        this.setState({
          currentPage: 0,
        });
      } else {
        toast.error("Xóa không thành công");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  handleViewDetailOrder = async (item) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await getDetailOrderById(item.orderssId);
      } else {
        res = await getDetailOrderBySeller(item.orderssId);
      }
      // console.log(res);
      this.setState({
        isOpenModalView: true,
        detailOrder: res,
        curentOrder: item,
      });
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  toggleCloseModalViewDetail = () => {
    this.setState({
      isOpenModalView: false,
    });
  };
  doUpdateStatusOrder = async (data) => {
    try {
      let res;
      if (this.checkAdminOrLibrarian()) {
        res = await updateStatusOrder(data);
      } else {
        res = await updateStatusOrderBySeller(data);
      }
      // console.log(res);
      if (res === "successful") {
        this.setState({
          isOpenModalView: false,
        });
        this.getOrderPaging(0);
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  handleOnchangeInput = async (event) => {
    this.setState({
      keyword: event.target.value,
      action: "SEARCH",
    });
    try {
      let res;
      if (event.target.value === "") {
        this.getOrderPaging(0);
        this.setState({
          action: "",
        });
      }
      let data = {
        keysearch: event.target.value,
      };
      if (this.checkAdminOrLibrarian()) {
        res = await searchorderByAdmin(data);
      } else {
        res = await searchorderBySeller(data);
      }
      console.log(res);
      if (res) {
        this.setState({
          allOrder: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { numOfPage, allOrder, currentPage, detailOrder, curentOrder } =
      this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    return <div>Order</div>;
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderManage)
);
