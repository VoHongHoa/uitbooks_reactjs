import React, { Component } from "react";
import "./Search.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import Footer from "../Homepage/Footer";
import HomeHeader from "../Homepage/HomeHeader";
import { formatPrice } from "../../constants/format";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount() {}
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  handleDetailBook = (item) => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  checkScreen = () => {
    // this.setState({
    //   windowWidth: window.innerWidth,
    // });
    if (this.state.windowWidth > 768) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    let { searchBooks } = this.props;
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    searchBooks: state.books.searchBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionProduct)
);
