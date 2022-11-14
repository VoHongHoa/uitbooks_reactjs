import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { findBooksByBookId, ratingBook } from "../../services/BookService";
import "./DetailBook.scss";
import { addToCart } from "../../store/actions/AppAction";
import {
  addComment,
  getComment,
  editComment,
  deleteComment,
} from "../../services/ReviewService";
import moment from "moment";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { connect } from "react-redux";
import ModelEditReview from "./ModelEditReview";
import CurrencyFormat from "react-currency-format";

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
    return <div>Content HTML</div>;
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
