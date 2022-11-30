import React, { Component } from "react";
import "./Cart.scss";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  changeInputItem,
  deleteCart,
  deleteItem,
} from "../../store/actions/AppAction";
import { toast } from "react-toastify";
import { buyBooks, buyBooksByGuest } from "../../services/userService";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { formatPrice } from "../../constants/format";
import _ from "lodash";
import PayPalCheckoutButton from "../../components/PayPalCheckoutButton";
var phoneRegex = new RegExp("^(?=.*[0-9])");
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allItemInCart: [],
      fullName: "",
      address: "",
      phoneNumber: "",
      errPhone: true,
      email: "",
      errEmail: true,
      statusPayment: "chưa thanh toán",
    };
  }
  componentDidMount() {
    this.setState({
      allItemInCart: this.props.allItemInCart,
    });
    if (!_.isEmpty(this.props.userInfor)) {
      console.log(this.props.userInfor);
      this.setState({
        fullName: this.props.userInfor.fullName,
        email: this.props.userInfor.email,
        address:
          this.props.userInfor.address === null
            ? ""
            : this.props.userInfor.address,
        phoneNumber:
          this.props.userInfor.telephone === null
            ? ""
            : this.props.userInfor.telephone,
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allItemInCart !== this.props.allItemInCart) {
      this.setState({
        allItemInCart: this.props.allItemInCart,
      });
    }
  }
  // handleOnchangeInput = (event, item) => {
  //   let copyState = { ...this.state };
  //   let quantity = event.target.value;
  //   for (let index = 0; index < copyState.allItemInCart.length; index++) {
  //     if (copyState.allItemInCart[index]._id === item._id) {
  //       copyState.allItemInCart[index].quantity = quantity;
  //       break;
  //     }
  //   }
  //   this.setState({
  //     ...copyState,
  //   });
  //   this.props.changeInputItem(this.state.allItemInCart);
  // };
  handleIncreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItemInCart.length; index++) {
      if (copyState.allItemInCart[index].bookId === item.bookId) {
        copyState.allItemInCart[index].quantity =
          parseInt(copyState.allItemInCart[index].quantity) + 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItemInCart);
  };
  handleDeleteBook = (item) => {
    this.props.deleteItem(item);
  };

  handleDecreaseQuantity = (item) => {
    let copyState = { ...this.state };
    for (let index = 0; index < copyState.allItemInCart.length; index++) {
      if (
        copyState.allItemInCart[index].bookId === item.bookId &&
        copyState.allItemInCart[index].quantity > 1
      ) {
        copyState.allItemInCart[index].quantity =
          parseInt(copyState.allItemInCart[index].quantity) - 1;
        break;
      }
    }
    this.setState({
      ...copyState,
    });
    this.props.changeInputItem(this.state.allItemInCart);
  };
  handleBuyBooks = async () => {
    let cart = [];
    if (this.checkInput()) {
      if (this.state.allItemInCart && this.state.allItemInCart.length > 0) {
        for (let index = 0; index < this.state.allItemInCart.length; index++) {
          let obj = {};
          obj.quantity = this.state.allItemInCart[index].quantity;
          obj.books = this.state.allItemInCart[index].bookId;
          obj.total = this.state.allItemInCart[index].price * obj.quantity;
          cart.push(obj);
        }
        let user = {};

        user = {
          fullName: this.state.fullName,
          address: this.state.address,
          telephone: this.state.phoneNumber,
          email: this.state.email,
        };

        let data = {
          cartBooks: cart,
          user: user,
          pay: this.state.statusPayment,
        };
        console.log(data);
        let res;
        if (this.props.isLogin === true) {
          res = await buyBooks(data);
        } else {
          res = await buyBooksByGuest(data);
        }

        console.log(res);
        if (res && res.length > 0) {
          toast.success("Mua sách thành công");
          this.props.deleteCart();
          this.props.history.push("/");
        }
      } else {
        toast.error("Vui lòng chọn thêm sản phẩm");
      }
    }
  };
  checkInput = () => {
    let isValid = true;
    if (this.state.errPhone === false || this.state.phoneNumber === "") {
      toast.error("Vui lòng nhập số điện thoại hợp lệ");
      isValid = false;
      return isValid;
    }
    if (this.state.errEmail === false || this.state.email === "") {
      toast.error("Nhập email");
      isValid = false;
      return isValid;
    }
    if (this.state.address === "") {
      toast.error("Nhập địa chỉ nhận hàng");
      isValid = false;
      return isValid;
    }
    if (this.state.fullName === "") {
      toast.error("Nhập tên khách hàng");
      isValid = false;
      return isValid;
    }
    return isValid;
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeEmail = (event) => {
    let email = event.target.value;
    this.setState({
      email: email,
    });
    if (email.includes("@gmail.com")) {
      this.setState({
        errEmail: true,
      });
    } else {
      this.setState({
        errEmail: false,
      });
    }
  };
  handleOnchangePhoneNumber = (event) => {
    // console.log(event.target.value.charAt(0));
    let phoneNumber = event.target.value;
    this.setState({
      phoneNumber: phoneNumber,
    });
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
    }
  };
  changePayment = () => {
    this.setState({
      statusPayment: "đã thanh toán",
    });
  };
  render() {
    //console.log(this.state.allItemInCart);
    let { allItemInCart } = this.state;
    let { userInfor } = this.props;
    let total = 0;
    return (
      <div className="CartContainer">
        <HomeHeader />
        <section className="container" style={{ backgroundColor: "#d2c9ff" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h1 className="fw-bold mb-0 text-black">
                              Giỏ sách
                            </h1>
                            <h6 className="mb-0 text-muted">
                              {allItemInCart.length} sách
                            </h6>
                          </div>
                          {allItemInCart &&
                            allItemInCart.length > 0 &&
                            allItemInCart.map((item, index) => {
                              total = total + item.price * item.quantity;
                              return (
                                <div
                                  className="row mb-4 d-flex justify-content-between align-items-center cart"
                                  key={index}
                                >
                                  <div className="col-md-2 col-lg-2 col-xl-2">
                                    <img
                                      src={item.image}
                                      className="img-fluid rounded-3"
                                      alt="Cotton T-shirt"
                                    />
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-3">
                                    <h6 className="text-muted">Sách</h6>
                                    <h6 className="text-black mb-0">
                                      {item.nameBook}
                                    </h6>
                                  </div>
                                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        this.handleDecreaseQuantity(item)
                                      }
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>

                                    <input
                                      id="form1"
                                      name="quantity"
                                      value={item.quantity}
                                      type="number"
                                      className="form-control form-control-sm"
                                      onChange={(event) =>
                                        this.handleOnchangeInput(event, item)
                                      }
                                    />

                                    <button
                                      className="btn btn-link px-2"
                                      onClick={() =>
                                        this.handleIncreaseQuantity(item)
                                      }
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                    <h6 className="mb-0">
                                      {formatPrice(item.price)}
                                    </h6>
                                  </div>
                                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                    <a href="#!" className="text-muted">
                                      <i
                                        className="fas fa-times"
                                        onClick={() =>
                                          this.handleDeleteBook(item)
                                        }
                                      ></i>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}

                          <div className="pt-5">
                            <h6 className="mb-0">
                              <Link to="/" className="text-body">
                                <i className="fas fa-long-arrow-alt-left me-2"></i>
                                Tiếp tục mua sách
                              </Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      {allItemInCart && allItemInCart.length > 0 && (
                        <div className="col-lg-4 bg-grey">
                          <div className="p-5">
                            <h3 className="fw-bold mb-2 pt-1">Hóa đơn</h3>
                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-2">
                              <h5 className="text-uppercase">
                                {allItemInCart.length} sách
                              </h5>
                            </div>

                            <div className="mb-2 pb-2">
                              <label
                                className="form-label"
                                htmlFor="form3Examplea2"
                              >
                                Họ và tên
                              </label>
                              <input
                                type="text"
                                id="form3Examplea2"
                                placeholder="Nhập họ và tên"
                                className="form-control"
                                value={this.state.fullName}
                                onChange={(event) =>
                                  this.handleOnchangeInput(event, "fullName")
                                }
                              />
                            </div>

                            <div className="mb-2 pb-2">
                              <label
                                className="form-label"
                                htmlFor="form3Examplea2"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập email"
                                name="email"
                                onChange={(event) =>
                                  this.handleOnchangeEmail(event)
                                }
                                value={this.state.email}
                              />
                              <span
                                className={
                                  this.state.errEmail === false
                                    ? "notice"
                                    : "no-notice"
                                }
                              >
                                Email phải có định dạng: *@gmail.com
                              </span>
                            </div>

                            {/* <h5 className="text-uppercase mb-3">Give code</h5> */}

                            <div className="mb-2">
                              <div className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="form3Examplea2"
                                >
                                  Địa chỉ
                                </label>
                                <textarea
                                  type="text"
                                  id="form3Examplea2"
                                  placeholder="Nhập địa chỉ"
                                  className="form-control"
                                  value={this.state.address}
                                  onChange={(event) =>
                                    this.handleOnchangeInput(event, "address")
                                  }
                                />
                              </div>
                            </div>

                            <div className="mb-2">
                              <div className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="phonenumber"
                                >
                                  Số điện thoại
                                </label>
                                <input
                                  type="text"
                                  placeholder="Nhập số điện thoại"
                                  className="form-control"
                                  name="phonenumber"
                                  onChange={(event) =>
                                    this.handleOnchangePhoneNumber(event)
                                  }
                                  value={this.state.phoneNumber}
                                  readOnly={
                                    this.state.action === "EDIT_USER"
                                      ? true
                                      : false
                                  }
                                  required
                                />
                                <span
                                  className={
                                    this.state.errPhone === false
                                      ? "notice"
                                      : "no-notice"
                                  }
                                >
                                  Số điện thoại không hợp lệ
                                </span>
                              </div>
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between mb-5">
                              <h5 className="text">Trị giá hóa đơn</h5>
                              <h5>{formatPrice(total)}</h5>
                            </div>

                            <button
                              type="button"
                              className="btn btn-primary btn-block btn-lg btn-pay"
                              data-mdb-ripple-color="dark"
                              onClick={() => this.handleBuyBooks()}
                            >
                              Thanh toán khi nhận sách
                            </button>
                            <p className="mt-2">Hoặc</p>
                            <PayPalCheckoutButton
                              total={total}
                              handleBuyBooks={this.handleBuyBooks}
                              checkInput={this.checkInput}
                              changePayment={this.changePayment}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    allItemInCart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: (item) => dispatch(deleteItem(item)),
    changeInputItem: (allItems) => dispatch(changeInputItem(allItems)),
    deleteCart: () => dispatch(deleteCart()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
