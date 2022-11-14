import React, { Component } from "react";
import "./SectionBook.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { formatPrice } from "../../constants/format";
import { addToCart } from "../../store/actions/AppAction";
import { getBookHomePage } from "../../services/HomeService";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      bookOrder: [],
      bookRating: [],
      numOfPage: 0,
      currentPage: 0,
      windowWidth: window.innerWidth,
    };
  }
  getAllBook = async (currentPage) => {
    try {
      let res = await getBookHomePage(currentPage);
      console.log(res);
      this.setState({
        bookList: res.bookList.bookList,
        bookOrder: res.bookOder,
        bookRating: res.bookRating,
      });
      if (res && res.bookList) {
        let numOfPage = 0;
        if (
          res.bookList.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN ===
          0
        ) {
          numOfPage =
            res.bookList.count / process.env.REACT_APP_PAGING_LIMIT_ADMIN;
        } else {
          numOfPage =
            (res.bookList.count -
              (res.bookList.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN)) /
              process.env.REACT_APP_PAGING_LIMIT_ADMIN +
            1;
        }
        this.setState({
          numOfPage: numOfPage,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server!!");
    }
  };
  handleDetailBook = (item) => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  handleAddToCart = (item) => {
    //console.log(item);
    this.props.addToCart(item);
  };
  componentDidMount() {
    this.getAllBook(this.state.currentPage);
    this.setState({
      windowWidth: window.innerWidth,
    });
  }
  handleChangePage = (item) => {
    this.getAllBook(item);
    this.setState({
      currentPage: item,
    });
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
    let { bookList, bookOrder, bookRating, numOfPage, currentPage } =
      this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(bookList);
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
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
