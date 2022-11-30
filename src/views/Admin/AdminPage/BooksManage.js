import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import ModalAddNewBook from "./ModalAddNewBook";
import {
  addNewBook,
  getAllBooksPaging,
  deleteBook,
  editBook,
  getAllBooksPagingBySeller,
  getSearchBook,
} from "../../../services/BookService";
import { formatPrice } from "../../../constants/format";
class BooksManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 0,
      numOfBooks: 0,
      numOfPage: 0,
      isOpenModal: false,
      action: "",
      currentBook: {},
      keyword: "",
    };
  }
  getBooksPaging = async (currentPage) => {
    try {
      let res;
      if (this.checkAdminOrSeller()) {
        res = await getAllBooksPaging(currentPage);
      } else {
        res = await getAllBooksPagingBySeller(currentPage);
      }
      console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN === 0) {
          numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_ADMIN;
        } else {
          numOfPage =
            (res.count -
              (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN)) /
              process.env.REACT_APP_PAGING_LIMIT_ADMIN +
            1;
        }
        this.setState({
          numOfBooks: res.count,
          allBooks: res.bookList,
          numOfPage: numOfPage,
        });
      } else {
        this.setState({
          ...this.state,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getBooksPaging(0);
  }
  checkAdminOrSeller = () => {
    let isValid = true; // admin: true , librarian: false

    if (
      this.props.userInfor &&
      this.props.userInfor.role.nameRole === "SELLER"
    ) {
      isValid = false;
    }
    return isValid;
  };
  handleChangePage = (item) => {
    this.getBooksPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteBook = async (bookId) => {
    let res = await deleteBook(bookId);
    //console.log(res);
    if (res) {
      toast.success("Xóa thành công!");
    }
    this.getBooksPaging(0);
  };
  // handleOnchangeInput = (event) => {
  //   this.setState({
  //     newCategories: event.target.value,
  //   });
  // };

  handleAddNewBook = () => {
    this.setState({
      isOpenModal: true,
      action: "ADD_NEW_BOOK",
    });
  };
  handleEditBook = (item) => {
    this.setState({
      isOpenModal: true,
      action: "EDIT_BOOK",
      currentBook: item,
    });
  };
  toggle = () => {
    this.setState({
      isOpenModal: false,
      action: "",
    });
  };
  doAddNewBook = async (data) => {
    let res = await addNewBook(data);
    //console.log(res);
    if (res) {
      this.setState({
        isOpenModal: false,
      });
      toast.success("Thêm thành công !!!");
      this.getBooksPaging(0);
    } else {
      toast.error("Thêm thất bại!Vui lòng kiểm tra lại");
    }
  };
  doEditBook = async (data, bookId) => {
    try {
      //console.log(data);
      let res = await editBook(data, bookId);
      console.log(res);
      if (res) {
        this.setState({
          isOpenModal: false,
        });
        this.getBooksPaging(0);
        toast.success("Chỉnh sửa thành công!");
      }
    } catch (e) {
      toast.error("Chỉnh sửa thất bại!");
      console.log(e);
    }
  };
  handleOnchangeInput = async (event) => {
    this.setState({
      keyword: event.target.value,
      action: "SEARCH",
    });
    try {
      let res;
      if (event.target.value === "") {
        this.getBooksPaging(0);
        this.setState({
          action: "",
        });
      }
      let data = {
        infoBook: event.target.value,
      };
      if (this.checkAdminOrSeller()) {
        res = await getSearchBook(data);
      } else {
        res = await getSearchBook(data);
      }
      //console.log(res);
      if (res) {
        this.setState({
          allBooks: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { numOfPage, allBooks, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(this.state);
    return (
      <div className="categories-manage-container container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3">
          {this.props.userInfor &&
          this.props.userInfor.role.nameRole === "ADMIN"
            ? "Quản lý sách"
            : "Xem thông tin sách"}
        </h2>
        {this.props.userInfor &&
          this.props.userInfor.role.nameRole === "ADMIN" && (
            <button
              className="btn btn-primary mt-2"
              onClick={() => this.handleAddNewBook()}
            >
              <i className="fa-solid fa-plus"></i> Thêm mới
            </button>
          )}

        <div className="col-12 mb-3 mt-3">
          <label htmlFor="search">
            <b>Tìm kiếm sách</b>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Tìm kiếm sách"
            name="search"
            onChange={(event) => this.handleOnchangeInput(event)}
          />
        </div>

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Giá</th>
                {this.props.userInfor &&
                  this.props.userInfor.role.nameRole === "ADMIN" && (
                    <th scope="col">Thao tác</th>
                  )}
              </tr>
            </thead>
            <tbody>
              {allBooks &&
                allBooks.length > 0 &&
                allBooks.map((item, index) => {
                  return (
                    <tr key={item.bookId}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nameBook}</td>
                      <td>{item.author}</td>
                      <td>{item.count}</td>
                      <td>{formatPrice(item.price)}</td>
                      {this.props.userInfor &&
                        this.props.userInfor.role.nameRole === "ADMIN" && (
                          <td>
                            <i
                              className="fas fa-pencil"
                              style={{ margin: "3px", cursor: "pointer" }}
                              onClick={() => this.handleEditBook(item)}
                            ></i>
                            <i
                              className="fas fa-trash "
                              style={{ margin: "3px", cursor: "pointer" }}
                              onClick={() => this.handleDeleteBook(item.bookId)}
                            ></i>
                          </td>
                        )}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {this.state.action !== "SEARCH" && this.state.action !== "EDIT_BOOK" && (
            <div className="pagination">
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
          )}
        </div>
        <ModalAddNewBook
          isOpenModal={this.state.isOpenModal}
          toggle={this.toggle}
          doAddNewBook={this.doAddNewBook}
          action={this.state.action}
          currentBook={this.state.currentBook}
          doEditBook={this.doEditBook}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BooksManage)
);
