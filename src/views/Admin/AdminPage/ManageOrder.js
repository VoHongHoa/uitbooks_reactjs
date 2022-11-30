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
    return (
      <div className="container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3 mb-3">Quản lý đơn hàng</h2>
        <div className="col-12 mb-3">
          <label htmlFor="search">
            <b>Tìm kiếm hóa đơn</b>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Tìm kiếm hóa đơn"
            name="search"
            onChange={(event) => this.handleOnchangeInput(event)}
          />
        </div>

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Khách hàng</th>
                <th scope="col">Địa chỉ giao hàng</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tống số sách</th>
                <th scope="col">Ngày hóa đơn</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Trạng thái thanh toán</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {allOrder &&
                allOrder.length > 0 &&
                allOrder.map((item, index) => {
                  return (
                    <tr key={item.orderssId}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.fullName}</td>
                      <td>{item.address}</td>
                      <td>{item.telephone}</td>
                      <td>{item.totalBook}</td>
                      <td>{moment(item.orderssDate).format("MM/DD/YYYY")}</td>
                      <td>{item.status}</td>
                      <td>{item.pay}</td>
                      <td className="">
                        <i
                          className="fa-solid fa-eye"
                          style={{ margin: "3px", cursor: "pointer" }}
                          onClick={() => this.handleViewDetailOrder(item)}
                        ></i>
                        <i
                          className="fas fa-pencil"
                          style={{ margin: "3px", cursor: "pointer" }}
                          onClick={() => this.handleEditUser(item)}
                        ></i>
                        <i
                          className="fas fa-trash"
                          style={{ margin: "3px", cursor: "pointer" }}
                          onClick={() => this.handleDeleteOrder(item.orderssId)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {this.state.action !== "SEARCH" && (
            <div className="pagination">
              <p>&laquo;</p>
              {arr &&
                arr.length &&
                arr.map((item, index) => {
                  return (
                    <p
                      onClick={() => this.handleChangePage(item)}
                      className={currentPage === item ? "active" : ""}
                      key={index}
                    >
                      {item}
                    </p>
                  );
                })}
              <p>&raquo;</p>
            </div>
          )}
        </div>
        <ModalViewDetailOrder
          toggle={this.toggleCloseModalViewDetail}
          isOpenModalView={this.state.isOpenModalView}
          detailOrder={detailOrder}
          curentOrder={curentOrder}
          doUpdateStatusOrder={this.doUpdateStatusOrder}
        />
      </div>
    );
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
