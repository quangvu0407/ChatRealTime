import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import vdHome from "../../assets/vdHome.mp4";

const HomeChat = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Register");
  };
  return (
    <div
      style={{
        minHeight: "calc(100vh - 3.75rem)",
        color: "#1e293b",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container fluid className="px-4 px-md-5">
        <Row className="align-items-center gy-5 gx-0">
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h1
              className="fw-extrabold display-4 mb-3"
              style={{ letterSpacing: "-1px", color: "#0f172a" }}
            >
              Kết nối tức thì với <br />
              <span
                style={{
                  background:
                    "linear-gradient(to right, #5884e3, #4f46e5, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Chúng tôi
              </span>
            </h1>

            <p
              className="fs-5 mb-4 mx-auto mx-lg-0"
              style={{ maxWidth: "500px", color: "#64748b" }}
            >
              Trải nghiệm nền tảng trò chuyện mượt mà, bảo mật và hoàn toàn theo
              thời gian thực. Chia sẻ khoảnh khắc với bạn bè chỉ trong một nháy
              mắt.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <Button
                variant="primary"
                size="lg"
                className="px-4 py-2 fw-bold shadow-sm"
                style={{
                  backgroundColor: "#4f46e5",
                  borderColor: "#4f46e5",
                  borderRadius: "12px",
                }}
                onClick={handleClick}
              >
                Bắt đầu ngay
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                className="px-4 py-2 fw-bold"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "transparent",
                  borderColor: "#cbd5e1",
                  color: "#475569",
                }}
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </Col>

          <Col
            lg={6}
            md={12}
            className="d-flex justify-content-center position-relative"
          >
            {/* Background Blur Effect */}
            <div
              style={{
                position: "absolute",
                width: "320px",
                height: "320px",
                background: "rgba(99, 102, 241, 0.08)",
                borderRadius: "50%",
                filter: "blur(70px)",
                zIndex: 0,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="p-3 style-image-container"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                borderRadius: "24px",
                maxWidth: "700px",
                width: "100%",
                zIndex: 1,
                transition: "transform 0.3s ease",
                overflow: "hidden",
                aspectRatio: "16/9",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <video
                src={vdHome}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  objectFit: "cover", // Giúp video lấp đầy khung hình mà không bị méo
                  pointerEvents: "none", // Ngăn người dùng click chuột phải hoặc tương tác dừng video
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeChat;
