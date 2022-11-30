import React, { Component } from "react";
import "./Order.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { getOrder } from "../../services/OrderService";
import moment from "moment";
import { toast } from "react-toastify";
import { formatPrice } from "../../constants/format";
import { userGetDetailOrderById } from "../../services/OrderService";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allOrder: [],
      detailOrder: [],
    };
  }
  componentDidMount() {
    this.fetchGetOrder();
  }
  fetchGetOrder = async () => {
    let data = {
      keysearch: this.props.userInfor.userId,
    };
    try {
      let res = await getOrder(data);
      // console.log("Check res: ", res);
      if (res) {
        this.setState({
          allOrder: res,
        });
        this.addDetailOrder();
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  addDetailOrder = async () => {
    let allOrder = this.state.allOrder;
    for (let i = 0; i < allOrder.length; i++) {
      let Detail = await userGetDetailOrderById(allOrder[i].orderssId);
      // console.log("check detail: ", Detail);
      this.setState({
        detailOrder: [...this.state.detailOrder, Detail],
      });
    }
  };
  render() {
    let { allOrder, detailOrder } = this.state;
    console.log("check again: ", allOrder);
    return (
      <React.Fragment>
        <div className="mb-2">
          <HomeHeader />
        </div>
        <h2>Lịch sử mua hàng</h2>
        {allOrder && allOrder.length > 0 ? (
          allOrder.map((item, index) => {
            return (
              <div className="container order-card">
                <div className="row">
                  <p>
                    ID đơn hàng: <b>{item.orderssId}</b>
                  </p>
                  <div className="col-sm-6">
                    <p>
                      Tên khách hàng: <span>{item.fullName}</span>{" "}
                    </p>
                    <p>
                      Số điện thoại: <span>{item.telephone}</span>{" "}
                    </p>
                    <p>
                      Địa chỉ: <span>{item.address}</span>{" "}
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      Trị giá đơn hàng:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {item.totalPrice
                          ? formatPrice(item.totalPrice)
                          : item.totalPrice}
                      </span>{" "}
                    </p>
                    <p>
                      Trạng thái đơn hàng: <b>{item.status}</b>{" "}
                    </p>
                    <p>
                      Ngày hóa đơn:
                      <b> {moment(item.orderssDate).format("MM/DD/YYYY")}</b>
                    </p>
                  </div>
                </div>
                <h4 style={{ textAlign: "center" }}>Danh sách sản phẩm</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Tên sách</th>
                      <th scope="col">Tác giả</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder &&
                      detailOrder.length > 0 &&
                      detailOrder[index]?.map((item, index) => {
                        return (
                          <tr key={item.orderssDeId}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.book?.nameBook}</td>
                            <td>{item.book?.author}</td>
                            <td>
                              <div
                                className="img-product"
                                style={{
                                  backgroundImage: `url(${item.book?.image})`,
                                  backgroundRepeat: "none",
                                  backgroundSize: "cover",
                                  width: "50px",
                                  height: "60px",
                                  backgroundPosition: "center",
                                }}
                              ></div>
                            </td>
                            <td>{item.count}</td>
                            <td>
                              {item.book && item.book?.price
                                ? formatPrice(item.book?.price)
                                : item.book?.price}
                            </td>
                            <td>
                              {item.total
                                ? formatPrice(item.total)
                                : item.total}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            );
          })
        ) : (
          <div>Không có đơn hàng nào</div>
        )}
        <div className="mt-2">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Order));
