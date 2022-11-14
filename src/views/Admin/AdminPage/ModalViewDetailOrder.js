import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import { formatPrice } from "../../../constants/format";
class ModalViewDetailOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageStatus: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  toggle = () => {
    this.props.toggle();
  };
  handleChangeStatusOrder = (curentOrder) => {
    console.log(curentOrder);
    let data = {
      orderssId: curentOrder.orderssId,
      status: "đã giao hàng",
      pay: curentOrder.pay,
      address: curentOrder.address,
      telephone: curentOrder.telephone,
    };
    this.props.doUpdateStatusOrder(data);
  };
  handleChangeStatusPay = (curentOrder) => {
    let data = {
      orderssId: curentOrder.orderssId,
      status: curentOrder.status,
      pay: "đã thanh toán",
      address: curentOrder.address,
      telephone: curentOrder.telephone,
    };
    this.props.doUpdateStatusOrder(data);
  };

  render() {
    let { detailOrder, curentOrder } = this.props;
    console.log(curentOrder);
    return <div>Content HTML</div>;
  }
}

export default ModalViewDetailOrder;
