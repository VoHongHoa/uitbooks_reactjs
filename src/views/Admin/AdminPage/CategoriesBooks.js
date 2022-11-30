import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import {
  addNewCategoriesBooks,
  deleteCategories,
  editCategoy,
  getAllCategoriesBooks,
  getAllCategoriesBooksByLibrarian,
} from "../../../services/CategoriesBooksService";
import "./CategoriesBook.scss";
class CategoriesBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategories: "",
      allCategories: [],
      currentPage: 0,
      numOfCategories: 0,
      numOfPage: 0,
      action: "",
      currentItem: {},
    };
  }
  getCategoriesPaging = async (currentPage) => {
    let res;
    if (this.checkAdminOrSeller()) {
      res = await getAllCategoriesBooks(currentPage);
    } else {
      res = await getAllCategoriesBooksByLibrarian(currentPage);
    }
    // console.log(res);
    if (res) {
      let numOfPage = 0;
      if (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN === 0) {
        numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_ADMIN;
      } else {
        numOfPage =
          (res.count - (res.count % process.env.REACT_APP_PAGING_LIMIT_ADMIN)) /
            process.env.REACT_APP_PAGING_LIMIT_ADMIN +
          1;
      }
      this.setState({
        numOfCategories: res.count,
        allCategories: res.categoryList,
        numOfPage: numOfPage,
      });
    } else {
      this.setState({
        ...this.state,
      });
    }
  };
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
  componentDidMount() {
    this.getCategoriesPaging(0);
  }
  handleChangePage = (item) => {
    this.getCategoriesPaging(item);
    this.setState({
      currentPage: item,
    });
  };
  handleDeleteCategories = async (userId) => {
    let res = await deleteCategories(userId);
    console.log(res);
    if (res) {
      toast.success("Xóa thành công!");
    }
    this.getCategoriesPaging(0);
  };
  isValid = (arr, newCategories) => {
    let isValid = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].nameCate === newCategories) {
        toast.error("Loại sách đã tồn tại");
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  handleOnchangeInput = (event) => {
    if (this.isValid(this.state.allCategories, event.target.value)) {
      this.setState({
        newCategories: event.target.value,
      });
    }
  };
  handleAddNewCategoriesBook = async () => {
    if (this.state.newCategories === "") {
      toast.error("Nhập tên loại sách");
    } else {
      try {
        let data = {
          nameCate: this.state.newCategories,
        };
        let res = await addNewCategoriesBooks(data);
        if (res) {
          toast.success("Thêm thành công");
          this.setState({
            newCategories: "",
          });
          this.getCategoriesPaging(0);
        } else {
          toast.error("Thêm không thành công");
        }
      } catch (e) {
        console.log(e);
        toast.error("Lỗi hệ thống");
      }
    }
  };
  handleChooseCate = async (item) => {
    console.log(item);
    this.setState({
      action: "EDIT_CATEGORY",
      newCategories: item.nameCate,
      currentItem: item,
    });
  };
  handleEditCategoriesBook = async () => {
    try {
      let data = {
        categoryId: this.state.currentItem.categoryId,
        nameCate: this.state.newCategories,
      };
      //console.log(data);
      let res = await editCategoy(data);
      console.log(res);
      if (res === "successful") {
        this.getCategoriesPaging(0);
        toast.success("Chỉnh sửa thành công");
        this.setState({
          action: "",
          newCategories: "",
          currentItem: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleCancelEdit = () => {
    this.setState({
      action: "",
      newCategories: "",
      currentItem: "",
    });
  };
  render() {
    let { numOfPage, allCategories, currentPage } = this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    return (
      <div className="categories-manage-container container">
        <AdminHeader></AdminHeader>
        <h2 className="title mt-3">Quản lý loại sách</h2>
        {this.props.userInfor &&
          this.props.userInfor.role.nameRole === "ADMIN" && (
            <div className="form-groud mt-3 mb-3">
              <label>Thêm mới loại sách</label>
              <input
                className="form-control"
                type={"text"}
                value={this.state.newCategories}
                onChange={(event) => this.handleOnchangeInput(event)}
              />
              {this.state.action === "EDIT_CATEGORY" ? (
                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => this.handleEditCategoriesBook()}
                  >
                    Lưu
                  </button>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => this.handleCancelEdit()}
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => this.handleAddNewCategoriesBook()}
                >
                  <i className="fa-solid fa-plus"></i> Thêm mới
                </button>
              )}
            </div>
          )}

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Loại sách và Tên</th>
                {this.props.userInfor &&
                  this.props.userInfor.role.nameRole === "ADMIN" && (
                    <th scope="col">Thao tác</th>
                  )}
              </tr>
            </thead>
            <tbody>
              {allCategories &&
                allCategories.length > 0 &&
                allCategories.map((item, index) => {
                  return (
                    <tr key={item.categoryId}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.nameCate}</td>
                      {this.props.userInfor &&
                        this.props.userInfor.role.nameRole === "ADMIN" && (
                          <td>
                            <i
                              className="fas fa-pencil"
                              style={{ margin: "3px", cursor: "pointer" }}
                              onClick={() => this.handleChooseCate(item)}
                            ></i>
                            <i
                              className="fas fa-trash"
                              style={{ margin: "3px", cursor: "pointer" }}
                              onClick={() =>
                                this.handleDeleteCategories(item.categoryId)
                              }
                            ></i>
                          </td>
                        )}
                    </tr>
                  );
                })}
            </tbody>
          </table>

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
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(CategoriesBooks)
);
