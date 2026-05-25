import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
// Import các icon mạng xã hội phổ biến từ react-icons (Tùy chọn)
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        color: "#64748b",
        fontSize: "0.95rem",
        padding: "4rem 0 2rem 0",
      }}
    >
      <Container fluid className="px-4 px-md-5">
        <Row className="gy-4">
          {/* CỘT 1: THÔNG TIN THƯƠNG HIỆU */}
          <Col lg={4} md={12} className="text-center text-lg-start">
            <h5
              className="fw-bold mb-3"
              style={{
                background: "linear-gradient(to right, #4f46e5, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.25rem",
              }}
            >
              ChatApp
            </h5>
            <p
              style={{ maxWidth: "320px", lineHeight: "1.6" }}
              className="mx-auto mx-lg-0"
            >
              Nền tảng kết nối thời gian thực, bảo mật và mượt mà. Chia sẻ mọi
              khoảnh khắc với bạn bè một cách trọn vẹn nhất.
            </p>
          </Col>

          {/* CỘT 2: LIÊN KẾT NHANH */}
          <Col sm={6} lg={4} className="text-center">
            <h6 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
              Giải pháp
            </h6>
            <Stack gap={2} className="align-items-center">
              <a
                href="#features"
                className="text-decoration-none text-reset hover-link"
              >
                Tính năng
              </a>
              <a
                href="#security"
                className="text-decoration-none text-reset hover-link"
              >
                Bảo mật
              </a>
              <a
                href="#pricing"
                className="text-decoration-none text-reset hover-link"
              >
                Bảng giá
              </a>
            </Stack>
          </Col>

          {/* CỘT 3: HỖ TRỢ / LIÊN HỆ */}
          <Col sm={6} lg={4} className="text-center text-lg-end">
            <h6 className="fw-bold mb-3" style={{ color: "#0f172a" }}>
              Kết nối với chúng tôi
            </h6>
            {/* Mạng xã hội */}
            <div className="d-flex justify-content-center justify-content-lg-end gap-3 mb-3">
              {[
                { icon: <FaFacebookF />, url: "#fb" },
                { icon: <FaTwitter />, url: "#tw" },
                { icon: <FaGithub />, url: "#gh" },
                { icon: <FaLinkedinIn />, url: "#in" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="d-flex align-items-center justify-content-center text-reset text-decoration-none social-icon"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4f46e5";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.borderColor = "#4f46e5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.color = "#64748b";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="small mb-0">Hỗ trợ: support@chatapp.com</p>
          </Col>
        </Row>

        {/* ĐƯỜNG NGĂN CÁCH BÊN DƯỚI */}
        <hr className="my-4" style={{ borderColor: "#f1f5f9" }} />

        {/* BẢN QUYỀN */}
        <Row className="align-items-center small text-center text-sm-start">
          <Col sm={6} className="mb-2 mb-sm-0">
            &copy; {currentYear} ChatApp. Tất cả các quyền được bảo lưu.
          </Col>
          <Col sm={6} className="text-sm-end">
            <a href="#privacy" className="text-decoration-none text-reset me-3">
              Chính sách bảo mật
            </a>
            <a href="#terms" className="text-decoration-none text-reset">
              Điều khoản sử dụng
            </a>
          </Col>
        </Row>
      </Container>

      {/* Thêm chút CSS cho hiệu ứng hover đường link, bạn có thể chuyển vào file CSS chung */}
      <style>{`
        .hover-link {
          transition: color 0.2s ease;
        }
        .hover-link:hover {
          color: #4f46e5 !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
