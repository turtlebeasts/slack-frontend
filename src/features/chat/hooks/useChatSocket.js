import { useEffect, useRef, useState } from "react";
import { createSocket } from "../../../shared/lib/socketClient";

export function useChatSocket(activeChannelId) {
  const socketRef = useRef(null);
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = createSocket(token);
    socketRef.current = socket;

    socket.on("message:new", (msg) => {
      setIncomingMessage(msg);
    });

    socket.on("presence:update", ({ onlineUserIds }) => {
      setOnlineUserIds(onlineUserIds);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    if (activeChannelId) {
      socketRef.current.emit("channel:join", activeChannelId);
    }
    return () => {
      if (socketRef.current && activeChannelId) {
        socketRef.current.emit("channel:leave", activeChannelId);
      }
    };
  }, [activeChannelId]);

  const sendMessage = (channelId, content) => {
    if (!socketRef.current) return;
    socketRef.current.emit("message:send", { channelId, content });
  };

  return { onlineUserIds, incomingMessage, sendMessage };
}
