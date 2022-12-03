import React, { Component } from "react";
import "./Term.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Term extends Component {
  handleReturnHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
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
            </span>{" "}
            | <b>Chính sách bảo mật</b>
          </p>
        </section>
        <div className="container terms">
          <div className="row head">
            <NavLink to={"/chinh-sach-bao-mat"} className="col column active">
              Chính sách bảo mật
            </NavLink>
            <NavLink to={"/dieu-khoan-su-dung"} className="col column">
              Điều khoản sử dụng
            </NavLink>
          </div>
          <div className="content">
            <h2>CHÍNH SÁCH BẢO MẬT</h2>
            <h4>I. Thông tin bảo mật.</h4>
            <p>
              Bảo mật thông tin khách hàng là một trong những ưu tiên hàng đầu
              nhằm tạo điều kiện mua sắm tốt nhất cho quý khách tại UITBOOK.
              Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện sự
              quan tâm của UITBOOK dành cho quí khách. Vì thế, UITBOOK cam kết
              việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch
              vụ khách hàng và tạo môi trường mua sắm an tòan, tiện lợi tại
              UITBOOK. Cụ thể, thông tin cá nhân của quý khách chỉ dùng với các
              mục đích sau:
            </p>
            <ol>
              <li>
                Số điện thoại và địa chỉ Email của quý khách được dùng nhằm nâng
                cao chất lượng dịch vụ hỗ trợ khách hàng.
              </li>
              <li>
                Địa chỉ của quý khách chỉ được dùng để UITBOOK thực thiện việc
                giao hàng mà quý khách đã đặt trên website UITBOOK.com.
              </li>
              <li>
                Hành vị mua hàng của quý khách chỉ giúp UITBOOK tạo một trải
                nghiệm mua sắm tốt hơn cho quý khách.
              </li>
            </ol>

            <h4>II. UITBOOK cam kết bảo vệ thông tin của khách hàng</h4>

            <ul>
              <li>
                UITBOOK cam đoan sẽ không bán, chia sẻ dẫn đến làm lộ thông tin
                cá nhân của quý khách vì bất cứ mục đích gì. Tất cả thông tin
                giao dịch giữa quý khách và UITBOOK sẽ được bảo mật qua phần mềm
                Secure Sockets Layer (SSL) bằng cách mã hóa tất cả thông tin quý
                khách nhập vào.
              </li>
              <li>
                UITBOOK cam kết không lưu lại bất kỳ thông tin tài khoản ngân
                hàng, thông tin thẻ tín dụng và thông tin tài chính của quý
                khách.
              </li>
            </ul>
            <h4>III. Trách nhiệm của khách hàng.</h4>
            <ul>
              <li>
                Quý khách không nên trao đổi những thông tin tài khoản, thanh
                toán, giao nhận của mình cho 1 bên thứ 3 nào khác để tránh rò rỉ
                thông tin. Khi sử dụng chung máy tính với nhiều người, vui lòng
                thoát khỏi tài khoản mỗi khi không sử dụng dịch vụ của UITBOOK
                nữa để tự bảo vệ thông tin về mật khẩu truy cập của mình.
              </li>
              <li>
                Ngoài ra, quý khách tuyệt đối không được sử dụng bất kỳ hình
                thức nào để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ
                liệu. Chúng tôi nghiêm cấm việc phát tán, truyền bá hay cổ vũ
                cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập
                vào dữ liệu của hệ thống website. Mọi vi phạm sẽ bị tước bỏ mọi
                quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
                Mọi thông tin của quí khách tại UITBOOK sẽ được chúng tôi bảo
                mật nhưng trong trường hợp pháp luật yêu cầu, chúng tôi buộc
                phải cung cấp thông tin này cho cơ quan pháp luật
              </li>
            </ul>
            <h4>
              IV. Thông tin bảo mật với tài khoản liên kết với bên thứ 3
              (Facebook).
            </h4>
            <ul>
              <li>
                UITBOOK sẽ liên kết với tài khoản bên thứ 3 của bạn và sử dụng
                thông tin id của bên thứ 3 (facebook id) hoặc tài khoản email
                (nếu khách hàng cho phép) để tự động tạo tài khoản cho khách
                hàng
              </li>
              <li>
                UITBOOK sẽ liên kết với tài khoản bên thứ 3 của bạn để giúp
                UITBOOK xác định được thông tin khách hàng là ai để hỗ trợ việc
                định danh người dùng
              </li>
              <li>
                Khách hàng có thể xóa thông tin email và id của bên thứ 3
                (facebook id) bằng cách thay đổi email trong mục tài khoản
                UITBOOK thì hệ thống UITBOOK sẽ không lưu lại email của bên thứ
                3
              </li>
            </ul>
            <p>
              UITBOOK hiểu rằng quyền lợi của quý khách trong việc bảo vệ thông
              tin cá nhân cũng chính là trách nhiệm của UITBOOK, nên trong bất
              kỳ trường hợp có thắc mắc, góp ý nào liên quan đến chính sách bảo
              mật của UITBOOK, vui lòng liên hệ:
              <br />
              <br />
              Tel: 1900636467
              <br />
              Email: info@uitbook.com
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Term);
