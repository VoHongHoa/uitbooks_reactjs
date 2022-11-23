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
    return (
      <Modal
        isOpen={this.props.isOpenModalView}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-product-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          <h2>Chi tiết đơn hàng</h2>
        </ModalHeader>
        <ModalBody>
          <h3 style={{ textAlign: "center" }}>Thông tin đơn hàng</h3>
          <p>
            Tên khách hàng: <span>{curentOrder.fullName}</span>{" "}
          </p>
          <p>
            Số điện thoại: <span>{curentOrder.telephone}</span>{" "}
          </p>
          <p>
            Địa chỉ: <span>{curentOrder.address}</span>{" "}
          </p>
          <p>
            Trị giá đơn hàng:{" "}
            <span style={{ fontWeight: "bold" }}>
              {curentOrder.totalPrice
                ? formatPrice(curentOrder.totalPrice)
                : curentOrder.totalPrice}
            </span>{" "}
          </p>
          <p>
            Trạng thái đơn hàng: <span>{curentOrder.status}</span>{" "}
          </p>
          <p>
            Trạng thái thanh toán: <span>{curentOrder.pay}</span>{" "}
          </p>
          <p>
            Ngày hóa đơn:
            <span>{moment(curentOrder.orderssDate).format("MM/DD/YYYY")}</span>
          </p>
          <h3 style={{ textAlign: "center" }}>Danh sách sản phẩm</h3>
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
                detailOrder.map((item, index) => {
                  console.log("Check detail: ", detailOrder);
                  return (
                    <tr key={item.orderssDeId}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.book.nameBook}</td>
                      <td>{item.book.author}</td>
                      <td>
                        <div
                          className="img-product"
                          style={{
                            backgroundImage: `url(${item.book.image})`,
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
                        {item.book && item.book.price
                          ? formatPrice(item.book.price)
                          : item.book.price}
                      </td>
                      <td>
                        {item.total ? formatPrice(item.total) : item.total}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </ModalBody>
        <ModalFooter>
          {curentOrder && curentOrder.status !== "đã giao hàng" && (
            <Button
              color="primary"
              onClick={() => this.handleChangeStatusOrder(curentOrder)}
            >
              Chuyển trạng thái đơn hàng
            </Button>
          )}

          {curentOrder && curentOrder.pay !== "đã thanh toán" && (
            <Button
              color="primary"
              onClick={() => this.handleChangeStatusPay(curentOrder)}
            >
              Chuyển trạng thái thanh toán
            </Button>
          )}

          <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
            className="px-3"
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalViewDetailOrder;
