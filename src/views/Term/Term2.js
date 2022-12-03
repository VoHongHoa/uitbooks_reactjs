import React, { Component } from "react";
import "./Term.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink, withRouter } from "react-router-dom";

class Term2 extends Component {
  handleReturnHome = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="container">
        <HomeHeader />
        <section id="sidebar">
          <p>
            <span
              onClick={() => this.handleReturnHome()}
              style={{ cursor: "pointer" }}
            >
              Trang chủ
            </span>{" "}
            | <b>Điều khoản sử dụng</b>
          </p>
        </section>
        <div className="container terms">
          <div className="row head">
            <NavLink to={"/chinh-sach-bao-mat"} className="col column">
              Chính sách bảo mật
            </NavLink>
            <NavLink to={"/dieu-khoan-su-dung"} className="col active column">
              Điều khoản sử dụng
            </NavLink>
          </div>
          <div className="content">
            <h2>ĐIỀU KHOẢN SỬ DỤNG</h2>
            <p>
              Chào mừng quý khách đến mua sắm tại UITBOOK. Sau khi truy cập vào
              website UITBOOK để tham khảo hoặc mua sắm, quí khách đã đồng ý
              tuân thủ và ràng buộc với những quy định của UITBOOK. Vui lòng xem
              kỹ các quy định và hợp tác với chúng tôi để xây dựng 1 website
              UITBOOK ngày càng thân thiện và phục vụ tốt những yêu cầu của
              chính quí khách. Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa
              thuận trên đây, vui lòng email cho chúng tôi qua địa chỉ
              support@UITBOOK.com.
            </p>
            <h4>Tài khoản của khách hàng</h4>
            <p>
              Khi sử dụng dịch vụ UITBOOK, quí khách sẽ cung cấp cho chúng tôi
              thông tin về địa chỉ email, mật khẩu và họ tên để có được 1 tài
              khoản tại đây. Việc sử dụng và bảo mật thông tin tài khoản là
              trách nhiệm và quyền lợi của quí khách khi sử dụng UITBOOK. Ngoài
              ra, những thông tin khác trong tài khoản như tên tuổi, địa chỉ....
              là những thông tin sẽ giúp UITBOOK phục vụ quí khách tốt nhất.
              Trong trường hợp thông tin do quí khách cung cấp không đầy đủ hoặc
              sai dẫn đến việc không thể giao hàng cho quí khách, chúng tôi có
              quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu
              bất cứ trách nhiệm nào đối với quí khách. Khi có những thay đổi
              thông tin của quí khách, vui lòng cập nhật lại thông tin trong tài
              khoản tại UITBOOK. Quí khách phải giữ kín mật khẩu và tài khoản,
              hoàn toàn chịu trách nhiệm đối với tất cả các hoạt động diễn ra
              thông qua việc sử dụng mật khẩu hoặc tài khoản của mình. Quí khách
              nên đảm bảo thoát khỏi tài khoản tại UITBOOK sau mỗi lần sử dụng
              để bảo mật thông tin của mình
            </p>
            <h4>Quyền lợi bảo mật thông tin của khách hàng</h4>
            <p>
              Khi sử dụng dịch vụ tại website UITBOOK, quí khách được đảm bảo
              rằng những thông tin cung cấp cho chúng tôi sẽ chỉ được dùng để
              nâng cao chất lượng dịch vụ dành cho khách hàng của UITBOOK và sẽ
              không được chuyển giao cho 1 bên thứ ba nào khác vì mục đích
              thương mại. Thông tin của quí khách tại UITBOOK sẽ được chúng tôi
              bảo mật và chỉ trong trường hợp pháp luật yêu cầu, chúng tôi sẽ
              buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.
            </p>
            <h4>Trách nhiệm của khách hàng khi sử dụng dịch vụ của UITBOOK</h4>
            <p>
              Quí khách tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp
              nào để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay
              đổi cấu trúc dữ liệu tại website UITBOOK. Quí khách không được có
              những hành động ( thực hiện, cổ vũ) việc can thiệp, xâm nhập dữ
              liệu của UITBOOK cũng như hệ thống máy chủ của chúng tôi Ngoài ra,
              xin vui lòng thông báo cho quản trị web của UITBOOK ngay khi quí
              khách phát hiện ra lỗi hệ thống theo số điện thoại (84.08)
              38388832 - (84-08) 36026700 hoặc email support@UITBOOK.com
            </p>
            <p>
              Quí khách không được đưa ra những nhận xét, đánh giá có ý xúc
              phạm, quấy rối, làm phiền hoặc có bất cứ hành vi nào thiếu văn hóa
              đối với người khác. Không nêu ra những nhận xét có tính chính trị
              ( tuyên truyền, chống phá, xuyên tạc chính quyền), kỳ thị tôn
              giáo, giới tính, sắc tộc.... Tuyệt đối cấm mọi hành vi mạo nhận,
              cố ý tạo sự nhầm lẫn mình là một khách hàng khác hoặc là thành
              viên Ban Quản Trị UITBOOK
            </p>
            <h4>Trách nhiệm và quyền lợi của UITBOOK</h4>
            <p>
              Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm
              của mình, UITBOOK sẽ không chịu trách nhiệm về mọi tổn thất phát
              sinh. Ngoài ra, chúng tôi không cho phép các tổ chức, cá nhân khác
              quảng bá sản phẩm tại website UITBOOK mà chưa có sự đồng ý bằng
              văn bản từ UITBOOK Corporation. Các thỏa thuận và quy định trong
              Điều khoản sử dụng có thể thay đổi vào bất cứ lúc nào nhưng sẽ
              được UITBOOK Corporation thông báo cụ thể trên website UITBOOK
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Term2);
