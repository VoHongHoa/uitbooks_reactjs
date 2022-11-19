import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "../../constants/format";
import { getBookHomePage } from "../../services/HomeService";
import { addToCart } from "../../store/actions/AppAction";
import "./SectionBook.scss";
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
    return <div className="section-book">
      <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
        Danh sách sách ở cửa hàng
      </h2>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {bookList &&
            bookList.length > 0 &&
            bookList.map((item, index) => {
              return (
                <div
                  className={
                    bookList.length >= 4
                      ? "col-sm-3 mt-2"
                      : "col-sm-auto mt-2"
                  }
                  key={index}
                >
                  <div className="fade-in">
                    <div
                      className="card"
                      style={
                        this.checkScreen()
                          ? { height: "500px" }
                          : { height: "550px" }
                      }
                    >
                      <div onClick={() => this.handleDetailBook(item)}>
                        <div className="card-body">
                          <div className="card-img-actions">
                            <img
                              src={item.image}
                              className="card-img img-fluid"
                              width="96"
                              height="200"
                              alt="item.nameBook"
                            />
                          </div>
                        </div>
                        <div className="card-body bg-light text-center">
                          <div className="mb-2">
                            <a
                              href="#"
                              className="text-muted name"
                              data-abc="true"
                            >
                              {item.nameBook}
                            </a>
                          </div>
                          <div className="show">
                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fade-in">
                        <h3
                          className={
                            this.checkScreen()
                              ? "hide price mb-0 font-weight-semibold"
                              : "price mb-0 font-weight-semibold"
                          }
                        >
                          {formatPrice(item.price)}
                        </h3>
                        <button
                          type="button"
                          className={
                            this.checkScreen()
                              ? "hide btn-add btn bg-cart"
                              : "btn-add btn bg-cart"
                          }
                          onClick={() => this.handleAddToCart(item)}
                        >
                          <i className="fa fa-cart-plus mr-2"></i> Thêm vào
                          giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="pagination mb-2 mt-5">
            <div>
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
          </div>
        </div>
      </div>
      <div className="fade-in">
        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Danh sách sách bán chạy ở cửa hàng
        </h2>
      </div>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {bookOrder &&
            bookOrder.length > 0 &&
            bookOrder.map((item, index) => {
              return (
                <div className="col-md-3 mt-2" key={item.bookId}>
                  <div className="fade-in">
                    <div
                      className="card"
                      style={
                        this.checkScreen()
                          ? { height: "500px" }
                          : { height: "550px" }
                      }
                    >
                      <div onClick={() => this.handleDetailBook(item)}>
                        <div className="card-body">
                          <div className="card-img-actions">
                            <img
                              src={item.image}
                              className="card-img img-fluid"
                              width="96"
                              height="350"
                              alt="item.nameBook"
                            />
                          </div>
                        </div>
                        <div className="card-body bg-light text-center">
                          <div className="mb-2">
                            <a
                              href="#"
                              className="text-muted name"
                              data-abc="true"
                            >
                              {item.nameBook}
                            </a>
                          </div>
                          <div className="show">
                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fade-in">
                        <h3
                          className={
                            this.checkScreen()
                              ? "hide price mb-0 font-weight-semibold"
                              : "price mb-0 font-weight-semibold"
                          }
                        >
                          {formatPrice(item.price)}
                        </h3>
                        <button
                          type="button"
                          className={
                            this.checkScreen()
                              ? "hide btn-add btn bg-cart"
                              : "btn-add btn bg-cart"
                          }
                          onClick={() => this.handleAddToCart(item)}
                        >
                          <i className="fa fa-cart-plus mr-2"></i> Thêm vào
                          giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="fade-in">
        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Danh sách sách được đánh giá cao
        </h2>
      </div>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {bookRating &&
            bookRating.length > 0 &&
            bookRating.map((item, index) => {
              return (
                <div className="col-md-3 mt-2" key={item.nameBook}>
                  <div className="fade-in">
                    <div
                      className="card"
                      style={
                        this.checkScreen()
                          ? { height: "500px" }
                          : { height: "550px" }
                      }
                    >
                      <div onClick={() => this.handleDetailBook(item)}>
                        <div className="card-body">
                          <div className="card-img-actions">
                            <img
                              src={item.image}
                              className="card-img img-fluid"
                              width="96"
                              height="350"
                              alt="item.nameBook"
                            />
                          </div>
                        </div>
                        <div className="card-body bg-light text-center">
                          <div className="mb-2">
                            <a
                              href="#"
                              className="text-muted name"
                              data-abc="true"
                            >
                              {item.nameBook}
                            </a>
                          </div>
                          <div className="show">
                            {item.rating === 1 && (
                              <div>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 2 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 3 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 4 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            {item.rating === 5 && (
                              <div>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                                <i className="fa fa-star star"></i>
                              </div>
                            )}
                            <div className="text-muted mb-3">
                              {item.cmt} đánh giá
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="fade-in">
                        <h3
                          className={
                            this.checkScreen()
                              ? "hide price mb-0 font-weight-semibold"
                              : "price mb-0 font-weight-semibold"
                          }
                        >
                          {formatPrice(item.price)}
                        </h3>
                        <button
                          type="button"
                          className={
                            this.checkScreen()
                              ? "hide btn-add btn bg-cart"
                              : "btn-add btn bg-cart"
                          }
                          onClick={() => this.handleAddToCart(item)}
                        >
                          <i className="fa fa-cart-plus mr-2"></i> Thêm vào
                          giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div >
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
