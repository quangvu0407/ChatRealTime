import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import userStore from "../../stores/authStore.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, isLoading, error } = userStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }
    const { confirmPassword, ...data } = formData;

    try {
      await register(data);
      toast.success("Đăng kí thành công");
      navigate("/Verify");
    } catch (error) {
      console.error("Register failed:", error);
      toast.error("Lỗi! Vui lòng thử lại sau");
    }
  };

  return (
    /* CONTAINER NGOÀI CÙNG: Căn giữa tuyệt đối và tạo không gian cho đốm sáng phía sau */
    <div className="d-flex justify-content-center align-items-center w-100 position-relative" style={{ padding: "50px 0 50px 0" }}>
      {/* Hiệu ứng Đổ bóng mờ tương tự trang Login */}
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          background: "rgba(79, 70, 229, 0.12)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {/* Khung Form Đăng Ký Cao Cấp */}
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
          maxWidth: "460px", // Đặt chiều rộng tối đa vừa vặn cho form 4 trường nhập
        }}
      >
        {/* Header của Form */}
        <div className="text-center mb-4">
          <h2
            className="fw-bold"
            style={{ color: "#0f172a", fontSize: "1.75rem" }}
          >
            Đăng ký tài khoản
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Chào mừng đến với chúng tôi!
          </p>
        </div>

        {/* Thông báo lỗi hiển thị gọn gàng */}
        {error && (
          <div
            className="alert alert-danger py-2 small mb-3"
            style={{ borderRadius: "12px" }}
          >
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Trường Họ và tên */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label
              className="fw-semibold small"
              style={{ color: "#475569" }}
            >
              Họ và tên
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Nhập họ và tên"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
              }}
            />
          </Form.Group>

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
              disabled={isLoading}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
              }}
            />
          </Form.Group>

          {/* Trường Mật khẩu */}
          <Form.Group className="mb-3" controlId="formPassword">
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
              disabled={isLoading}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
              }}
            />
          </Form.Group>

          {/* Trường Xác nhận mật khẩu */}
          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Label
              className="fw-semibold small"
              style={{ color: "#475569" }}
            >
              Xác nhận mật khẩu
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
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
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          {/* Liên kết quay lại Đăng nhập */}
          <div className="text-center mt-3">
            <span className="small text-muted">Đã có tài khoản? </span>
            <a
              href="#login"
              className="text-decoration-none small fw-bold"
              style={{ color: "#4f46e5" }}
              onClick={() => navigate("/Login")}
            >
              Đăng nhập ngay
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
