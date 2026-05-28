import { useState } from "react";
import { InputGroup, Form, Badge, Dropdown } from "react-bootstrap";
import {
  Search,
  MoreHorizontal,
  ChevronDown,
  LogOut,
  User,
  GamepadDirectional,
} from "lucide-react";
import { contacts } from "../../assets/chatData";
import Avatar from "./Avatar";
import userStore from "../../stores/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const colors = {
  bg: "#111009",
  bgHover: "#1c1a18",
  bgActive: "#242220",
  border: "rgba(200,190,175,0.1)",
  fg: "#e8e3dc",
  muted: "#7a7168",
  accent: "#c8a97e",
  accentFg: "#0f0e0d",
  inputBg: "#1c1a18",
};

export default function Sidebar({ activeId, onSelect }) {
  const [search, setSearch] = useState("");
  const { logout } = userStore();
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const navigate = useNavigate();

  const statusOptions = [
    {
      label: "Online",
      icon: "🟢",
      color: "#4ade80",
    },
    {
      label: "Offline",
      icon: "⚪",
      color: "#9ca3af",
    },
    {
      label: "Away",
      icon: "🌙",
      color: "#facc15",
    },
    {
      label: "Do not disturb",
      icon: "⛔",
      color: "#ef4444",
    },
  ];
  const [status, setStatus] = useState(statusOptions[0]);

  const filtered = contacts.filter(
    (c) => search === "" || c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleLogOut = async () => {
    await logout();
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const handleMenuStatus = () => {
    setShowStatusMenu(!showStatusMenu);
  };
  return (
    <div
      style={{
        width: 280,
        minWidth: 280,
        height: "100%",
        background: colors.bg,
        borderRight: `1px solid ${colors.border}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 16px 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: colors.fg, fontWeight: 600, fontSize: 15 }}>
            Messages
          </span>
          <ChevronDown size={14} color={colors.muted} />
        </div>
        <button
          style={{
            width: 28,
            height: 28,
            background: "transparent",
            border: "none",
            color: colors.muted,
            fontSize: 20,
            lineHeight: 1,
            cursor: "pointer",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: "0 12px 12px" }}>
        <InputGroup size="sm">
          <InputGroup.Text
            style={{
              background: colors.inputBg,
              border: "none",
              color: colors.muted,
              borderRadius: "6px 0 0 6px",
            }}
          >
            <Search size={13} />
          </InputGroup.Text>
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            style={{
              background: colors.inputBg,
              border: "none",
              color: colors.fg,
              fontSize: 13,
              boxShadow: "none",
              borderRadius: "0 6px 6px 0",
            }}
          />
        </InputGroup>
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {filtered.map((c) => (
          <ContactRow
            key={c.id}
            contact={c}
            active={activeId === c.id}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* User footer */}
      <div
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#c8a97e22",
              border: "1px solid #c8a97e44",
              color: "#c8a97e",
              fontSize: 11,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            YO
          </div>
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: status.color,
              border: `1.5px solid ${colors.bg}`,
            }}
          />
        </div>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: colors.fg }}>
            You
          </div>
          <div
            style={{
              fontSize: 10,
              color: colors.muted,
              fontFamily: "monospace",
            }}
          >
            {status.icon} {status.label}
          </div>
        </div>
        <Dropdown drop="up">
          <Dropdown.Toggle
            as="button"
            className="border-0 bg-transparent p-0 shadow-none"
            style={{
              color: colors.muted,
              cursor: "pointer",
            }}
          >
            <MoreHorizontal size={16} style={{ color: "red" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              background: "#1e1c19",
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              minWidth: 160,
              padding: "4px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div className="position-relative">
              <div className="custom-dropdown-item">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div
                    className="d-flex align-items-center gap-2"
                    onClick={handleMenuStatus}
                  >
                    <GamepadDirectional size={14} />
                    Trạng thái
                  </div>

                  <span>›</span>
                </div>
              </div>

              {showStatusMenu && (
                <div
                  style={{
                    position: "absolute",
                    left: "100%",
                    top: -5,
                    marginLeft: 6,
                    background: "#1e1c19",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    minWidth: 150,
                    padding: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                    zIndex: 999,
                  }}
                  onClick={handleMenuStatus}
                >
                  {statusOptions.map((item) => (
                    <Dropdown.Item
                      key={item.label}
                      className="custom-dropdown-item"
                      onClick={() => {
                        setStatus(item);
                      }}
                    >
                      {item.icon} {item.label}
                    </Dropdown.Item>
                  ))}
                </div>
              )}
            </div>
            <Dropdown.Item
              className="custom-dropdown-item"
              onClick={handleLogOut}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2a1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <User size={14} />
              Cá nhân
            </Dropdown.Item>
            <Dropdown.Item
              className="custom-dropdown-item"
              onClick={handleLogOut}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2a1a1a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <LogOut size={14} />
              Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

function ContactRow({ contact: c, active, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onSelect(c.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        background: active
          ? colors.bgActive
          : hovered
            ? colors.bgHover
            : "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar initials={c.avatar} id={c.id} />
        {c.online && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.accent,
              border: `1.5px solid ${colors.bg}`,
            }}
          />
        )}
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: c.unread ? 600 : 400,
              color: colors.fg,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {c.name}
          </span>
          <span
            style={{
              fontSize: 10,
              color: colors.muted,
              fontFamily: "monospace",
              flexShrink: 0,
            }}
          >
            {c.lastTime}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            marginTop: 2,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: colors.muted,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {c.lastMessage}
          </span>
          {c.unread > 0 && (
            <Badge
              pill
              style={{
                background: colors.accent,
                color: colors.accentFg,
                fontSize: 10,
                minWidth: 16,
                flexShrink: 0,
              }}
            >
              {c.unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}
