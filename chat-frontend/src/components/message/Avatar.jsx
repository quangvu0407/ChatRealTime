import { avatarColors } from "../../assets/chatData";

export default function Avatar({ initials, id, size = "md" }) {
  const color = avatarColors[id] ?? "#888";
  const dim = size === "sm" ? 32 : size === "lg" ? 40 : 36;
  const fontSize = size === "sm" ? 11 : 12;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        minWidth: dim,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color + "33",
        color: color,
        border: `1px solid ${color}44`,
        fontSize,
        fontWeight: 500,
        letterSpacing: "0.05em",
      }}
    >
      {initials}
    </div>
  );
}
