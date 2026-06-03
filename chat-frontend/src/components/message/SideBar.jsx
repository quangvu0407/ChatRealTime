import { useState, useEffect, useCallback } from "react";
import { InputGroup, Form, Dropdown } from "react-bootstrap";
import {
  Search,
  MoreHorizontal,
  ChevronDown,
  LogOut,
  User,
  GamepadDirectional,
  UserPlus,
  Bell,
  X,
  Check,
} from "lucide-react";
import Avatar from "./Avatar";
import userStore from "../../stores/authStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  getFriends,
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getReceivedRequests,
  removeFriend,
} from "../../utils/friendApi";

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

const statusOptions = [
  { label: "Online", icon: "🟢", color: "#4ade80" },
  { label: "Offline", icon: "⚪", color: "#9ca3af" },
  { label: "Away", icon: "🌙", color: "#facc15" },
  { label: "Do not disturb", icon: "⛔", color: "#ef4444" },
];

export default function Sidebar({ activeId, onSelect }) {
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [status, setStatus] = useState(statusOptions[0]);
  const [loading, setLoading] = useState(false);

  const { logout, user } = userStore();
  const navigate = useNavigate();

  const loadFriends = useCallback(async () => {
    try {
      const data = await getFriends();
      setFriends(Array.isArray(data) ? data : []);
    } catch {
      setFriends([]);
    }
  }, []);

  const loadPendingRequests = useCallback(async () => {
    try {
      const data = await getReceivedRequests();
      setPendingRequests(Array.isArray(data) ? data : []);
    } catch {
      setPendingRequests([]);
    }
  }, []);

  useEffect(() => {
    loadFriends();
    loadPendingRequests();
  }, [loadFriends, loadPendingRequests]);

  // Debounced search
  useEffect(() => {
    if (search.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const results = await searchUsers(search.trim());
        setSearchResults(Array.isArray(results) ? results : []);
      } catch {
        setSearchResults([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSendRequest = async (receiverId) => {
    try {
      await sendFriendRequest(receiverId);
      toast.success("Đã gửi lời mời kết bạn");
      setSearchResults((prev) =>
        prev.map((u) =>
          u.id === receiverId ? { ...u, relationshipStatus: "pending_sent" } : u,
        ),
      );
    } catch (e) {
      toast.error(e?.response?.data?.message || "Gửi lời mời thất bại");
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await cancelFriendRequest(requestId);
      toast.success("Đã huỷ lời mời");
      loadPendingRequests();
    } catch {
      toast.error("Huỷ lời mời thất bại");
    }
  };

  const handleAccept = async (requestId) => {
    setLoading(true);
    try {
      await acceptFriendRequest(requestId);
      toast.success("Đã chấp nhận lời mời kết bạn");
      await Promise.all([loadFriends(), loadPendingRequests()]);
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
      toast.success("Đã từ chối lời mời");
      loadPendingRequests();
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId);
      toast.success("Đã xoá bạn bè");
      loadFriends();
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleLogOut = async () => {
    await logout();
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  const displayList =
    search.trim().length >= 2 ? searchResults : friends;

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
        <div style={{ display: "flex", gap: 4 }}>
          {/* Friend requests bell */}
          <button
            onClick={() => setShowRequests((v) => !v)}
            style={{
              position: "relative",
              width: 28,
              height: 28,
              background: showRequests ? colors.bgActive : "transparent",
              border: "none",
              color: colors.muted,
              cursor: "pointer",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={15} />
            {pendingRequests.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: colors.accent,
                  border: `1.5px solid ${colors.bg}`,
                }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Pending requests panel */}
      {showRequests && (
        <div
          style={{
            margin: "0 12px 8px",
            background: colors.bgHover,
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              fontSize: 11,
              color: colors.muted,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Lời mời kết bạn ({pendingRequests.length})
          </div>
          {pendingRequests.length === 0 && (
            <div
              style={{
                padding: "8px 12px",
                fontSize: 12,
                color: colors.muted,
              }}
            >
              Không có lời mời nào
            </div>
          )}
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderTop: `1px solid ${colors.border}`,
              }}
            >
              <AvatarFallback name={req.sender?.username} size={30} />
              <span
                style={{ flex: 1, fontSize: 12, color: colors.fg, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {req.sender?.username}
              </span>
              <button
                onClick={() => handleAccept(req.id)}
                disabled={loading}
                style={iconBtn("#4ade8044", "#4ade80")}
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => handleReject(req.id)}
                style={iconBtn("#ef444444", "#ef4444")}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

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
            placeholder="Tìm kiếm hoặc thêm bạn..."
            style={{
              background: colors.inputBg,
              border: "none",
              color: colors.fg,
              fontSize: 13,
              boxShadow: "none",
              borderRadius: "0 6px 6px 0",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: colors.inputBg,
                border: "none",
                color: colors.muted,
                cursor: "pointer",
                padding: "0 8px",
                borderRadius: "0 6px 6px 0",
              }}
            >
              <X size={12} />
            </button>
          )}
        </InputGroup>
      </div>

      {/* Section label */}
      <div
        style={{
          padding: "0 16px 6px",
          fontSize: 11,
          color: colors.muted,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {search.trim().length >= 2
          ? `Kết quả tìm kiếm (${searchResults.length})`
          : `Bạn bè (${friends.length})`}
      </div>

      {/* Contact list */}
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {displayList.length === 0 && (
          <div
            style={{
              padding: "16px",
              textAlign: "center",
              fontSize: 12,
              color: colors.muted,
            }}
          >
            {search.trim().length >= 2
              ? "Không tìm thấy người dùng"
              : "Chưa có bạn bè nào"}
          </div>
        )}
        {displayList.map((item) => {
          const isSearchResult = search.trim().length >= 2;
          if (isSearchResult) {
            return (
              <SearchResultRow
                key={item.id}
                user={item}
                onSendRequest={handleSendRequest}
                onCancelRequest={handleCancelRequest}
              />
            );
          }
          return (
            <FriendRow
              key={item.id}
              friend={item}
              active={activeId === item.id}
              onSelect={onSelect}
              onRemove={handleRemoveFriend}
            />
          );
        })}
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
          <AvatarFallback name={user?.username} size={32} />
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
            {user?.username || "You"}
          </div>
          <div style={{ fontSize: 10, color: colors.muted, fontFamily: "monospace" }}>
            {status.icon} {status.label}
          </div>
        </div>
        <Dropdown drop="up">
          <Dropdown.Toggle
            as="button"
            className="border-0 bg-transparent p-0 shadow-none"
            style={{ color: colors.muted, cursor: "pointer" }}
          >
            <MoreHorizontal size={16} style={{ color: colors.muted }} />
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
                  <div className="d-flex align-items-center gap-2" onClick={() => setShowStatusMenu(!showStatusMenu)}>
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
                  onClick={() => setShowStatusMenu(false)}
                >
                  {statusOptions.map((item) => (
                    <Dropdown.Item
                      key={item.label}
                      className="custom-dropdown-item"
                      onClick={() => setStatus(item)}
                    >
                      {item.icon} {item.label}
                    </Dropdown.Item>
                  ))}
                </div>
              )}
            </div>
            <Dropdown.Item className="custom-dropdown-item">
              <User size={14} />
              Cá nhân
            </Dropdown.Item>
            <Dropdown.Item className="custom-dropdown-item" onClick={handleLogOut}>
              <LogOut size={14} />
              Đăng xuất
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

function FriendRow({ friend, active, onSelect, onRemove }) {
  const [hovered, setHovered] = useState(false);
  const displayName = friend.nickname || friend.username;
  const isOnline = friend.status === "online";

  return (
    <button
      onClick={() => onSelect(friend.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        background: active ? colors.bgActive : hovered ? colors.bgHover : "transparent",
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
        <AvatarFallback name={friend.username} size={36} />
        {isOnline && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#4ade80",
              border: `1.5px solid ${colors.bg}`,
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: colors.fg, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayName}
        </div>
        <div style={{ fontSize: 11, color: colors.muted }}>
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>
      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(friend.id); }}
          style={{ ...iconBtn("#ef444422", "#ef4444"), flexShrink: 0 }}
          title="Xoá bạn"
        >
          <X size={11} />
        </button>
      )}
    </button>
  );
}

function SearchResultRow({ user, onSendRequest, onCancelRequest }) {
  const actionMap = {
    none: {
      label: "Thêm bạn",
      icon: <UserPlus size={12} />,
      style: iconBtn("#c8a97e22", colors.accent),
      action: () => onSendRequest(user.id),
    },
    pending_sent: {
      label: "Huỷ",
      icon: <X size={12} />,
      style: iconBtn("#7a716822", colors.muted),
      action: () => onCancelRequest(user.id),
    },
    pending_received: {
      label: "Đang nhận",
      icon: <Bell size={12} />,
      style: iconBtn("#4ade8022", "#4ade80"),
      action: null,
    },
    friend: {
      label: "Bạn bè",
      icon: <Check size={12} />,
      style: iconBtn("#4ade8022", "#4ade80"),
      action: null,
    },
  };

  const action = actionMap[user.relationshipStatus] || actionMap.none;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
      }}
    >
      <AvatarFallback name={user.username} size={36} />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ fontSize: 13, color: colors.fg, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.username}
        </div>
        <div style={{ fontSize: 11, color: colors.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.email}
        </div>
      </div>
      <button
        onClick={action.action}
        disabled={!action.action}
        style={{ ...action.style, flexShrink: 0, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}
        title={action.label}
      >
        {action.icon}
      </button>
    </div>
  );
}

function AvatarFallback({ name, size = 36 }) {
  const initials = name
    ? name.substring(0, 2).toUpperCase()
    : "??";
  const hue = name
    ? (name.charCodeAt(0) * 37 + name.charCodeAt(1 % name.length) * 17) % 360
    : 0;
  const color = `hsl(${hue}, 50%, 60%)`;

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `hsl(${hue}, 50%, 15%)`,
        color,
        border: `1px solid hsl(${hue}, 50%, 30%)`,
        fontSize: size * 0.33,
        fontWeight: 500,
        letterSpacing: "0.05em",
      }}
    >
      {initials}
    </div>
  );
}

function iconBtn(bgColor, fgColor) {
  return {
    width: 24,
    height: 24,
    borderRadius: 6,
    border: "none",
    background: bgColor,
    color: fgColor,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}
