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
    return <div>Content HTML</div>;
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
//updated
