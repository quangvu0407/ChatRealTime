import { Phone, Video, Search, MoreHorizontal, Circle } from "lucide-react";
import Avatar from "./Avatar";

const colors = {
  bg: "#181714",
  fg: "#e8e3dc",
  muted: "#7a7168",
  accent: "#c8a97e",
  border: "rgba(200,190,175,0.1)",
  hover: "#242220",
};

export default function ChatHeader({ contact }) {
  return (
    <div
      style={{
        background: colors.bg,
        borderBottom: `1px solid ${colors.border}`,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/* Left: avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <Avatar initials={contact.avatar} id={contact.id} size="lg" />
          {contact.online && (
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: colors.accent,
                border: `2px solid ${colors.bg}`,
              }}
            />
          )}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.fg }}>
            {contact.name}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            {contact.online ? (
              <>
                <Circle size={6} fill={colors.accent} color={colors.accent} />
                <span
                  style={{
                    fontSize: 11,
                    color: colors.muted,
                    fontFamily: "monospace",
                  }}
                >
                  online
                </span>
              </>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  color: colors.muted,
                  fontFamily: "monospace",
                }}
              >
                offline
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {[Phone, Video, Search, MoreHorizontal].map((Icon, i) => (
          <ActionBtn key={i} Icon={Icon} />
        ))}
      </div>
    </div>
  );
}

function ActionBtn({ Icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        border: "none",
        background: hovered ? colors.hover : "transparent",
        color: hovered ? colors.fg : colors.muted,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Icon size={15} />
    </button>
  );
}

import { useState } from "react";
