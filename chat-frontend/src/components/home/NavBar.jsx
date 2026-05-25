import React from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      style={{
        height: "3.75rem",
        background: "linear-gradient(to right, #5884e3, #4f46e5, #7c3aed)",
      }}
    >
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            ChatApp
          </Link>
        </h2>
        <span
          style={{
            color: "linear-gradient(to right, #5884e3, #4f46e5, #7c3aed)",
          }}
        >
          Ứng dụng chat trực tuyến qua web desktop
        </span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to="/Register" className="link-light text-decoration-none">
              Đăng Ký
            </Link>
            <Link to="/Login" className="link-light text-decoration-none">
              Đăng Nhập
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
