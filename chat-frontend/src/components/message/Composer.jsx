import { useRef } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

const colors = {
  bg: "#181714",
  inputBg: "#242220",
  fg: "#e8e3dc",
  muted: "#7a7168",
  accent: "#c8a97e",
  accentFg: "#0f0e0d",
  mutedBg: "#1c1a18",
  border: "rgba(200,190,175,0.1)",
};

export default function Composer({
  contactFirstName,
  value,
  onChange,
  onSend,
}) {
  const inputRef = useRef(null);

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
      inputRef.current?.focus();
    }
  }

  const canSend = value.trim().length > 0;

  return (
    <div
      style={{
        background: colors.bg,
        borderTop: `1px solid ${colors.border}`,
        padding: "16px 20px",
        flexShrink: 0,
      }}
    >
      {/* Input row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          background: colors.inputBg,
          borderRadius: 12,
          padding: "10px 14px",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            color: colors.muted,
            cursor: "pointer",
            padding: 0,
            marginBottom: 2,
            flexShrink: 0,
          }}
        >
          <Paperclip size={16} />
        </button>

        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`Message ${contactFirstName}…`}
          rows={1}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            color: colors.fg,
            fontSize: 13,
            lineHeight: 1.6,
            maxHeight: 128,
            scrollbarWidth: "none",
            fontFamily: "inherit",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            marginBottom: 2,
          }}
        >
          <button
            style={{
              background: "transparent",
              border: "none",
              color: colors.muted,
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Smile size={16} />
          </button>
          <button
            onClick={onSend}
            disabled={!canSend}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "none",
              background: canSend ? colors.accent : colors.mutedBg,
              color: canSend ? colors.accentFg : colors.muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: canSend ? "pointer" : "not-allowed",
              transition: "all 0.15s",
            }}
          >
            <Send size={13} />
          </button>
        </div>
      </div>

      {/* Hint */}
      <p
        style={{
          fontSize: 10,
          color: colors.muted,
          textAlign: "center",
          marginTop: 8,
          marginBottom: 0,
          fontFamily: "monospace",
        }}
      >
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
