import { useState } from "react";

import { contacts, initialThreads } from "../../assets/chatData";

import Sidebar from "../../components/message/SideBar";
import ChatHeader from "../../components/message/ChatHeader";
import MessageList from "../../components/message/MessageList";
import Composer from "../../components/message/Composer";

const MessagePage = () => {
  const [activeId, setActiveId] = useState("1");
  const [threads, setThreads] = useState(initialThreads);
  const [input, setInput] = useState("");

  const activeContact =
    contacts.find((c) => c.id === activeId) || {};

  const messages = threads[activeId] || [];

  function sendMessage() {
    const text = input.trim();

    if (!text) return;

    const msg = {
      id: `m${Date.now()}`,
      text,
      from: "me",
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), msg],
    }));

    setInput("");
  }

  function handleSelect(id) {
    setActiveId(id);
    setInput("");
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "#0f0e0d",
      }}
    >
      <Sidebar
        activeId={activeId}
        onSelect={handleSelect}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <ChatHeader contact={activeContact} />

        <MessageList
          messages={messages}
          contact={activeContact}
        />

        <Composer
          contactFirstName={
            activeContact?.name?.split(" ")[0] || ""
          }
          value={input}
          onChange={setInput}
          onSend={sendMessage}
        />
      </div>
    </div>
  );
};

export default MessagePage;