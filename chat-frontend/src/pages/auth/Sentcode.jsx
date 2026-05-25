import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const VerificationForm = ({ email }) => {
  const [code, setCode] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Xử lý gửi code lên server ở đây
      alert(`Mã code đã gửi: ${code}`);
    }

    setValidated(true);
  };

  return (
    <Container
      className="d-flex align-items-start justify-content-center pt-5"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        {/* Responsive: 12 cột trên mobile (xs), 8 cột trên tablet (md), 5 cột trên desktop (lg) */}
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow-sm border-0 px-3 py-4 rounded-3">
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="fw-bold text-dark">Xác Thực Mã Code</h3>
                <p className="text-muted small">
                  Vui lòng nhập mã code được gửi đến bạn để tiếp tục.
                </p>
              </div>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formVerificationCode">
                  <Form.Label className="fw-semibold text-secondary">
                    Mã xác thực
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nhập mã code tại đây..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="py-2 text-center fw-bold fs-5"
                    style={{ letterSpacing: "2px" }}
                    maxLength={10} // Giới hạn ký tự nếu cần
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập mã code hợp lệ.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="py-2 fs-6 fw-semibold"
                  >
                    Xác Nhận
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerificationForm;
