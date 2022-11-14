import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AdminHeader from "../AdminHeader/AdminHeader";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import "react-markdown-editor-lite/lib/index.css";
import {
  addNewBlog,
  deleteBlog,
  getAllBlog,
  updateBlog,
} from "../../../services/BlogService";
const mdParser = new MarkdownIt();
class BlogManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedBlog: "",
      action: "ADD_BLOG",
      allBlog: [],
      title: "",
      allSelectBlog: [],
      currentBlog: "",
    };
  }
  componentDidMount() {
    this.handleGetAllBlog();
  }
  componentDidUpdate() {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleGetAllBlog = async () => {
    try {
      let res = await getAllBlog();
      //console.log(res);
      this.setState({
        allBlog: res,
        allSelectBlog: this.builDataSelect(res),
      });
    } catch (e) {
      console.log(e);
    }
  };
  builDataSelect = (allBlog) => {
    let dataSelect = [];
    for (let index = 0; index < allBlog.length; index++) {
      let obj = {};
      obj.value = allBlog[index];
      obj.label = allBlog[index].title;
      dataSelect.push(obj);
    }
    return dataSelect;
  };
  handleAddNewBlog = async () => {
    if (this.state.action === "ADD_BLOG") {
      try {
        let data = {
          content: this.state.contentHTML,
          title: this.state.title,
          context: this.state.contentMarkdown,
        };
        console.log(data);
        let res = await addNewBlog(data);
        if (res === "successful") {
          toast.success("Thêm Blog thành công");
          this.setState({
            contentMarkdown: "",
            contentHTML: "",
            title: "",
          });
          this.handleGetAllBlog();
        }
        //console.log(res);
      } catch (e) {
        console.log(e);
        toast.error("Lỗi server");
      }
    }
    if (this.state.action === "EDIT_BLOG") {
      try {
        let data = {
          content: this.state.contentHTML,
          title: this.state.title,
          context: this.state.contentMarkdown,
          blogId: this.state.currentBlog,
        };
        let res = await updateBlog(data);
        console.log(res);
        if (res === "successful") {
          toast.success("Thay đổi thành công");
          this.handleGetAllBlog();
          this.setState({
            contentMarkdown: "",
            contentHTML: "",
            selectedBlog: "",
            action: "ADD_BLOG",
            title: "",
            currentBlog: "",
          });
        } else {
          toast.error("Thay đổi thất bại");
        }
      } catch (e) {
        console.log(e);
        toast.error("Lỗi Server");
      }
    }
  };
  handleOnchangeSelect = (selectedOption) => {
    this.setState({
      selectedBlog: selectedOption,
      currentBlog: selectedOption.value,
      title: selectedOption.value.title,
      contentMarkdown: selectedOption.value.context,
      action: "EDIT_BLOG",
      currentBlog: selectedOption.value.blogId,
    });
  };
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleCancel = () => {
    this.setState({
      contentMarkdown: "",
      contentHTML: "",
      selectedBlog: "",
      currentBlog: "",
      action: "ADD_BLOG",
      title: "",
    });
  };
  handleDeleteBlog = async () => {
    try {
      let res = await deleteBlog(this.state.currentBlog);
      console.log(res);
      if (res === "successful") {
        toast.success("Xóa thành công");
        this.handleGetAllBlog();
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          selectedBlog: "",
          action: "ADD_BLOG",
          title: "",
          currentBlog: "",
        });
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  render() {
    let { allSelectBlog, currentBlog } = this.state;
    return <div>Blog</div>;
  }
}
const mapStateToProps = (state) => {
  return { userInfor: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogManage)
);
