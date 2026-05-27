import { useRef, useEffect, useState } from "react";
import { Check, CheckCheck } from "lucide-react";
import Avatar from "./Avatar";

const colors = {
  bg: "#0f0e0d",
  bubbleMe: "#c8a97e",
  bubbleMeFg: "#0f0e0d",
  bubbleThem: "#181714",
  bubbleThemFg: "#e8e3dc",
  bubbleThemBorder: "rgba(200,190,175,0.12)",
  muted: "#7a7168",
  accent: "#c8a97e",
  separator: "rgba(200,190,175,0.1)",
};

function StatusTick({ status }) {
  if (status === "sent") return <Check size={12} color={colors.muted} />;
  if (status === "delivered")
    return <CheckCheck size={12} color={colors.muted} />;
  return <CheckCheck size={12} color={colors.accent} />;
}

export default function MessageList({ messages, contact }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: colors.bg,
        scrollbarWidth: "none",
      }}
    >
      {/* Date separator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "4px 0",
        }}
      >
        <div style={{ flex: 1, height: 1, background: colors.separator }} />
        <span
          style={{
            fontSize: 10,
            color: colors.muted,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Today
        </span>
        <div style={{ flex: 1, height: 1, background: colors.separator }} />
      </div>

      {messages.map((msg, i) => {
        const isMe = msg.from === "me";
        const prevSame = i > 0 && messages[i - 1].from === msg.from;
        return (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isMe={isMe}
            prevSame={prevSame}
            contact={contact}
          />
        );
      })}

      <div ref={endRef} />
    </div>
  );
}

function MessageBubble({ msg, isMe, prevSame, contact }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        flexDirection: isMe ? "row-reverse" : "row",
        marginTop: prevSame ? 2 : 12,
      }}
    >
      {/* Avatar placeholder for "them" */}
      {!isMe && (
        <div style={{ width: 32, flexShrink: 0 }}>
          {!prevSame && (
            <Avatar initials={contact.avatar} id={contact.id} size="sm" />
          )}
        </div>
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isMe ? "flex-end" : "flex-start",
          maxWidth: "60%",
          gap: 4,
        }}
      >
        {/* Bubble */}
        <div
          style={{
            padding: "8px 14px",
            fontSize: 13,
            lineHeight: 1.6,
            borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            background: isMe ? colors.bubbleMe : colors.bubbleThem,
            color: isMe ? colors.bubbleMeFg : colors.bubbleThemFg,
            border: isMe ? "none" : `1px solid ${colors.bubbleThemBorder}`,
          }}
        >
          {msg.text}
        </div>

        {/* Timestamp + status — show on hover */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexDirection: isMe ? "row-reverse" : "row",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.15s",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: colors.muted,
              fontFamily: "monospace",
            }}
          >
            {msg.time}
          </span>
          {isMe && <StatusTick status={msg.status} />}
        </div>
      </div>
    </div>
  );
}
