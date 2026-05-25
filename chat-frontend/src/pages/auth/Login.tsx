import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import userStore from "../../stores/authStore.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading, error } = userStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast.success("Đăng nhập thành công!");
      navigate("/message");
    } catch (error) {
      console.error("Register failed:", error);
      toast.error("Lỗi! Vui lòng thử lại sau");
    }
  };

  return (
    /* CONTAINER NGOÀI: Giúp căn giữa tuyệt đối và tạo hiệu ứng chiều sâu có đốm sáng màu */
    <div
      className="d-flex justify-content-center align-items-center w-100 position-relative"
      style={{ marginTop: "50px" }}
    >
      {/* Hiệu ứng Đổ bóng mờ phía sau Form (Đồng bộ với giao diện chính) */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "rgba(79, 70, 229, 0.12)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {/* Khung Card Đăng Ký */}
      <div
        style={{
          background: "#ffffff",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          borderRadius: "24px",
          padding: "2.5rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "450px",
        }}
      >
        {/* Tiêu đề */}
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{ color: "#0f172a", fontSize: "1.75rem" }}
          >
            Đăng nhập ngay
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Chào mừng bạn quay trở lại!
          </p>
        </div>

        {/* Thông báo lỗi từ store nếu có */}
        {error && (
          <div
            className="alert alert-danger py-2 small mb-3"
            style={{ borderRadius: "12px" }}
          >
            {error}
          </div>
        )}

        {/* Form Nhập Liệu */}
        <Form onSubmit={handleSubmit}>
          {/* Trường Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label
              className="fw-semibold small"
              style={{ color: "#475569" }}
            >
              Địa chỉ Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
              }}
            />
          </Form.Group>

          {/* Trường Mật khẩu */}
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label
              className="fw-semibold small"
              style={{ color: "#475569" }}
            >
              Mật khẩu
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
              }}
            />
          </Form.Group>

          {/* Nút bấm Đăng ký */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 fw-bold shadow-sm mb-3"
            disabled={isLoading}
            style={{
              backgroundColor: "#4f46e5",
              borderColor: "#4f46e5",
              borderRadius: "12px",
              paddingTop: "12px",
              paddingBottom: "12px",
            }}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập tài khoản"}
          </Button>

          {/* Điều hướng ngược lại Đăng nhập */}
          <div className="text-center mt-3">
            <span className="small text-muted">Bạn chưa có tài khoản? </span>
            <a
              href="#login"
              className="text-decoration-none small fw-bold"
              style={{ color: "#4f46e5" }}
              onClick={() => navigate("/Register")}
            >
              Đăng kí ngay
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
