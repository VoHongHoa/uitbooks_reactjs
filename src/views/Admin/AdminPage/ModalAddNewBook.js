import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Select from "react-select";
import CommonUtils from "../../../utils/CommonUtils";
import { getAllCategoriesBooksRedux } from "../../../store/actions/CategoriesAction";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
class ModalAddNewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      nameBook: "",
      author: "",
      publishYear: "",
      publishCom: "",
      price: "",
      count: "",
      description: "",
      image: "",
      allCategoriesBooks: [],
      selectedCategory: "",
    };
  }
  componentDidMount() {
    this.props.getAllCategoriesBooksRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allCategoriesBooks !== this.props.allCategoriesBooks) {
      this.setState({
        allCategoriesBooks: this.buildDataCateGories(
          this.props.allCategoriesBooks
        ),
      });
    }
    if (prevProps.action !== this.props.action) {
      this.setState({
        action: this.props.action,
      });
      if (this.props.action === "ADD_NEW_BOOK") {
        this.setState({
          bookId: "",
          nameBook: "",
          author: "",
          publishYear: "",
          publishCom: "",
          price: "",
          count: "",
          description: "",
          image: "",
          selectedCategory: "",
        });
      }
    }
    if (prevProps.currentBook !== this.props.currentBook) {
      //console.log(this.props.currentBook);
      this.setState({
        currentBook: this.props.currentBook,
        bookId: this.props.currentBook.bookId,
        nameBook: this.props.currentBook.nameBook,
        author: this.props.currentBook.author,
        publishYear: this.props.currentBook.publishYear,
        publishCom: this.props.currentBook.publishCom,
        price: this.props.currentBook.price,
        count: this.props.currentBook.count,
        description: this.props.currentBook.description,
        image: this.props.currentBook.image,
        selectedCategory: {
          value: this.props.currentBook.category,
          label: this.props.currentBook.category.nameCate,
        },
      });
    }
  }
  toggle = () => {
    this.props.toggle();
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeSelect = (selectedOption, id) => {
    let name = id.name;
    let copyState = { ...this.state };
    copyState[name] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    //console.log(file);
    if (file) {
      const storageRef = ref(storage, `/books/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("check url", url);
            this.setState({
              image: url,
            });
          });
        }
      );
    }
  };
  handleSubmitAdd = () => {
    if (this.checkValidateInput()) {
      let data = {
        nameBook: this.state.nameBook,
        author: this.state.author,
        publishYear: this.state.publishYear,
        publishCom: this.state.publishCom,
        price: this.state.price,
        count: this.state.count,
        description: this.state.description,
        image: this.state.image,
        category: this.state.selectedCategory.value,
      };
      let dataEdit = {
        bookId: this.state.bookId,
        nameBook: this.state.nameBook,
        author: this.state.author,
        publishYear: this.state.publishYear,
        publishCom: this.state.publishCom,
        price: this.state.price,
        count: this.state.count,
        description: this.state.description,
        image: this.state.image,
        category: this.state.selectedCategory.value,
      };
      let bookId = this.state.bookId;
      if (this.state.action === "EDIT_BOOK") {
        this.props.doEditBook(dataEdit, bookId);
      } else {
        this.props.doAddNewBook(data);
      }
      this.setState({
        nameBook: "",
        author: "",
        publishYear: "",
        publishCom: "",
        price: "",
        count: "",
        description: "",
        image: "",
        selectedCategory: "",
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      { value: "nameBook", label: "Tên sách" },
      { value: "author", label: "Tác giả" },
      { value: "publishYear", label: "Năm xuất bản" },
      { value: "publishCom", label: "Nhà xuất bản" },
      { value: "price", label: "Giá" },
      { value: "count", label: "Số lượng" },
      { value: "image", label: "Hình ảnh" },
      { value: "selectedCategory", label: "Loại sách" },
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i].value]) {
        isValid = false;
        toast.error(`Vui lòng điền thông tin: ${arrInput[i].label}`);
        break;
      }
    }
    return isValid;
  };
  buildDataCateGories = (listCategories) => {
    let arrCategories = [];
    for (let index = 0; index < listCategories.length; index++) {
      let objData = {};
      objData.label = listCategories[index].nameCate;
      let category = {};
      category.categoryId = listCategories[index].categoryId;
      category.nameCate = listCategories[index].nameCate;
      objData.value = category;
      arrCategories.push(objData);
    }
    return arrCategories;
  };
  render() {
    //console.log(this.state);
    let { allCategoriesBooks, action } = this.state;
    return <div>Content HTML</div>;
  }
}

const mapStateToProps = (state) => {
  return { allCategoriesBooks: state.books.allCategoriesBooks };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategoriesBooksRedux: () => dispatch(getAllCategoriesBooksRedux()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddNewBook);
