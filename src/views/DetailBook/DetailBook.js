import moment from "moment";
import React, { Component } from "react";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { findBooksByBookId, ratingBook } from "../../services/BookService";
import {
  addComment, deleteComment, editComment, getComment
} from "../../services/ReviewService";
import { addToCart } from "../../store/actions/AppAction";
import Footer from "../Homepage/Footer";
import HomeHeader from "../Homepage/HomeHeader";
import "./DetailBook.scss";
import ModelEditReview from "./ModelEditReview";

class DetailBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      newReview: "",
      allReview: [],
      isShowComment: true,
      curentReview: {},
      isOpenModal: false,
      showHide: false,
      numOfStar: 0,
      isShowEdit: false,
    };
  }
  async componentDidMount() {
    let id = this.props.match.params.id;
    this.getDetaiBookById(id);
  }
  getDetaiBookById = async (id) => {
    try {
      let res = await findBooksByBookId(id);
      console.log("book:", res);
      this.getAllReviews(id);
      if (res) {
        this.setState({
          book: res ? res : {},
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleAddToCart = (book) => {
    this.props.addToCart(book);
  };

  handleReturnHome = () => {
    this.props.history.push("/");
  };

  handleReturnCate = () => {
    let cateID = this.state.book.category?.categoryId;
    console.log("cateID: ", cateID);
    this.props.history.push(`/loai-sach/${cateID}`);
  };

  getAllReviews = async (bookId) => {
    try {
      let res = await getComment(bookId);
      console.log(res);
      this.setState({
        allReview: res,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleOnchangeInput = (event) => {
    this.setState({
      newReview: event.target.value,
    });
  };

  checkAddNewComment = () => {
    let isValid = true;
    if (this.props.isLogin === false) {
      toast.error("Vui lòng đăng nhập");
      isValid = false;
      return;
    }
    if (this.state.newReview === "") {
      toast.error("Vui lòng thêm nội dung bình luận!");
      isValid = false;
      return;
    }
    return isValid;
  };

  handleAddNewReview = async () => {
    if (this.state.newReview !== "") {
      try {
        if (this.checkAddNewComment()) {
          let data = {
            content: this.state.newReview,
          };
          let bookId = this.props.match.params.id;
          let res = await addComment(data, bookId);
          //console.log(res);
          if (res === "successfull") {
            this.setState({
              newReview: "",
            });
            toast.success("Thêm bình luận thành công!");
            this.getAllReviews(this.props.match.params.id);
            this.getDetaiBookById(this.props.match.params.id);
          }
        }
      } catch (e) {
        console.log(e);
        toast.error("Thêm bình luận không thành công");
      }
    }
    if (this.state.numOfStar !== 0) {
      try {
        let data = {
          bookId: this.props.match.params.id,
          star: this.state.numOfStar,
        };
        console.log(data);
        let res = await ratingBook(data);
        console.log(res);
        if (res === "successful") {
          this.setState({
            numOfStar: 0,
          });
          this.getDetaiBookById(this.props.match.params.id);
        }
        if (res === "error") {
          toast.error("Vui lòng đăng nhập");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleShowComment = () => {
    this.setState({
      isShowComment: !this.state.isShowComment,
    });
  };

  handledeleteComment = async (item) => {
    //onsole.log(item);
    try {
      let data = {
        commentId: item.commentId,
        bookId: this.props.match.params.id,
      };
      console.log(data);
      let res = await deleteComment(data);
      console.log(res);
      if (res === "successfull") {
        toast.success("Xóa bình luận thành công!");
        this.getAllReviews(this.props.match.params.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleOpenModaleditComment = async (item) => {
    this.setState({
      curentReview: item,
      isOpenModal: true,
    });
  };

  toggleFromParent = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  doeditComment = async (commentId, data) => {
    try {
      let res = await editComment(commentId, data);
      console.log(res);
      if (res && res === "successfull") {
        toast.success("Chỉnh sửa thành công");
        this.getAllReviews(this.props.match.params.id);
        this.setState({
          isOpenModal: false,
        });
      } else {
        toast.error("Chỉnh sửa thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleVoterating = (numOfStar) => {
    this.setState({ numOfStar: numOfStar });
  };
  handleShowActionComment = () => {
    this.setState({
      isShowEdit: !this.state.isShowEdit,
    });
  };
  render() {
    let { book, allReview, isShowComment, numOfStar, isShowEdit } = this.state;
    let isEmptyObj = Object.keys(book).length === 0;

    console.log(book);
    return <React.Fragment>
      <div className="container">
        <div className="section-header">
          <HomeHeader></HomeHeader>
        </div>
        <section id="sidebar">
          <p>
            <span
              onClick={() => this.handleReturnHome()}
              style={{ cursor: "pointer" }}
            >
              Trang chủ
            </span>
            <span
              onClick={() => this.handleReturnCate(book.category?.categoryId)}
              style={{ cursor: "pointer" }}
            >
              {" "}
              | {book.category?.nameCate}
            </span>{" "}
            | <b>{book.nameBook}</b>
          </p>
        </section>
        <div className="detail-body row justify-content-start">
          <div className="col-sm-6">
            <img className="detail-img" src={book.image} alt="book-img" />
          </div>
          <div className="col-sm-6">
            <h3>{book.nameBook}</h3>
            <p className="gia">
              Giá:{" "}
              <span className="detail-price">
                <CurrencyFormat
                  value={book.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"đ"}
                />
              </span>
            </p>
            <button
              type="button col-sm-6"
              className={"btn-add-detail btn bg-cart"}
              onClick={() => this.handleAddToCart(book)}
            >
              <i className="fa fa-cart-plus mr-2"></i>Thêm vào giỏ hàng
            </button>
            <p className="info">
              Nhà xuất bản: <span className="info2">{book.publishCom}</span>{" "}
            </p>
            <p className="info">
              {" "}
              Tác giả: <span className="info2">{book.author}</span>{" "}
            </p>
            <p className="info">
              {" "}
              Năm xuất bản: <span className="info2">
                {book.publishYear}
              </span>{" "}
            </p>
            <p className="info">
              {" "}
              Loại sách:{" "}
              <span className="info2">{book.category?.nameCate}</span>
            </p>
            <p className="info">
              {" "}
              Số lượng còn lại: <span className="info2">{book.count}</span>
            </p>
            <p className="info">
              {" "}
              Lượt đánh giá: <span className="info2">{book.cmt}</span>
            </p>
            <p className="info">
              Số sao:{" "}
              <span className="info2">
                {book.rating === 1 && (
                  <div>
                    <i className="fa fa-star star"></i>
                  </div>
                )}
                {book.rating === 2 && (
                  <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                  </div>
                )}
                {book.rating === 3 && (
                  <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                  </div>
                )}
                {book.rating === 4 && (
                  <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                  </div>
                )}
                {book.rating === 5 && (
                  <div>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                    <i className="fa fa-star star"></i>
                  </div>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className="description">
          <h4>Mô tả:</h4>
          <p>{book.description}</p>
        </div>
        <div className="comment">
          <h2>Nhận xét và đánh giá</h2>
          <div className="add-comment">
            <div className="form-groud">
              <label>Thêm nhận xét</label>

              <textarea
                className="form-control"
                onChange={event => this.handleOnchangeInput(event)}
                value={this.state.newReview}
              ></textarea>
            </div>

            <div className="rating">
              <span>Đánh giá sản phẩm: </span>
              <div className="star">
                <i
                  className={
                    1 <= numOfStar
                      ? "fa fa-star star active"
                      : "fa fa-star star"
                  }
                  onClick={() => this.handleVoterating(1)}
                ></i>
                <i
                  className={
                    2 <= numOfStar
                      ? "fa fa-star star active"
                      : "fa fa-star star"
                  }
                  onClick={() => this.handleVoterating(2)}
                ></i>
                <i
                  className={
                    3 <= numOfStar
                      ? "fa fa-star star active"
                      : "fa fa-star star"
                  }
                  onClick={() => this.handleVoterating(3)}
                ></i>
                <i
                  className={
                    4 <= numOfStar
                      ? "fa fa-star star active"
                      : "fa fa-star star"
                  }
                  onClick={() => this.handleVoterating(4)}
                ></i>
                <i
                  className={
                    5 <= numOfStar
                      ? "fa fa-star star active"
                      : "fa fa-star star"
                  }
                  onClick={() => this.handleVoterating(5)}
                ></i>
              </div>
            </div>
            <button
              className="btn btn-primary mb-2 mt-2"
              onClick={() => this.handleAddNewReview()}
            >
              Thêm đánh giá
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row  d-flex justify-content-center">
            <div className="col-md-8">
              <div className="headings d-flex justify-content-between align-items-center mb-3">
                <h5> {allReview.length} Bình luận</h5>

                <div className="buttons">
                  <span className="badge bg-white d-flex flex-row align-items-center">
                    <span className="text-primary">
                      Hiện bình luận {isShowComment === true ? "ON" : "OFF"}
                    </span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        checked={this.state.isShowComment}
                        onChange={() => this.handleShowComment()}
                      />
                    </div>
                  </span>
                </div>
              </div>
              {isShowComment === true && (
                <div className="comments-view mb-3">
                  {allReview &&
                    allReview.length > 0 &&
                    allReview.map((item, index) => {
                      return (
                        <div className="card p-3 mt-2" key={item.commentId}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="user d-flex flex-row align-items-center">
                              <img
                                src={
                                  item.user && item.user.image
                                    ? item.user.image
                                    : defaultAvatar
                                }
                                width="30"
                                className="user-img rounded-circle mr-2"
                              />
                              <span>
                                <small className="font-weight-bold text-primary">
                                  {item.user && item.user.fullName
                                    ? item.user.fullName
                                    : "Người dùng"}
                                </small>{" "}
                                <small className="font-weight-bold">
                                  {item.content}
                                </small>
                              </span>
                            </div>

                            <small>
                              {moment(item.dayAddt).format("DD/MM/YY")}
                            </small>

                            <div></div>
                          </div>
                          {this.props.userInfor &&
                            this.props.userInfor.userId ===
                            item.user.userId && (
                              <div className="action">
                                <span
                                  onClick={() =>
                                    this.handleOpenModaleditComment(item)
                                  }
                                >
                                  sửa
                                </span>
                                <span
                                  onClick={() =>
                                    this.handledeleteComment(item)
                                  }
                                >
                                  xóa
                                </span>
                              </div>
                            )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
        <ModelEditReview
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toggleFromParent}
          review={this.state.curentReview}
          doeditComment={this.doeditComment}
        />

        <Footer />
      </div>
    </React.Fragment>
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
    isLogin: state.user.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { addToCart: (item) => dispatch(addToCart(item)) };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailBook)
);
