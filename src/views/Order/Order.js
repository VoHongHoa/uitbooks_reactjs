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
    return <div>Content HTML</div>;
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
