import { useEffect, useState } from "react";
import { chatApi } from "../api";
import { ChannelList } from "../components/ChannelList";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";
import { OnlineUsers } from "../components/OnlineUsers";
import { useChatSocket } from "../hooks/useChatSocket";
import Spinner from "../../../shared/components/Spinner";

export default function ChatPage() {
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [loadingChannelData, setLoadingChannelData] = useState(false);

  const [joinedChannels, setJoinedChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  const [messages, setMessages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const [channelMembers, setChannelMembers] = useState([]);

  const { onlineUserIds, incomingMessage, sendMessage } = useChatSocket(
    activeChannel?.id
  );

  const loadChannels = async () => {
    try {
      setLoadingChannels(true);
      const [joinedRes, allRes] = await Promise.all([
        chatApi.getJoinedChannels(),
        chatApi.getAllChannels(),
      ]);

      const joined = joinedRes.data || [];
      const all = allRes.data || [];

      setJoinedChannels(joined);
      setAllChannels(all);

      if (!activeChannel && joined.length > 0) {
        setActiveChannel(joined[0]);
      }
    } catch (err) {
      console.error("Error loading channels", err);
    } finally {
      setLoadingChannels(false);
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    const loadChannelData = async () => {
      if (!activeChannel) {
        setMessages([]);
        setNextCursor(null);
        setChannelMembers([]);
        setLoadingChannelData(false);
        return;
      }

      try {
        setLoadingChannelData(true);

        const msgRes = await chatApi.getMessages(activeChannel.id);
        const msgs = msgRes.data?.messages || [];
        setMessages(msgs);
        setNextCursor(msgRes.data?.nextCursor || null);

        const detailsRes = await chatApi.getChannelDetails(activeChannel.id);
        setChannelMembers(detailsRes.data?.members || []);
      } catch (err) {
        console.error("Error loading channel data", err);
      } finally {
        setLoadingChannelData(false);
      }
    };

    loadChannelData();
  }, [activeChannel]);

  useEffect(() => {
    if (!incomingMessage) return;
    if (incomingMessage.channel_id === activeChannel?.id) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage, activeChannel?.id]);

  const handleSend = (content) => {
    if (!activeChannel) return;
    sendMessage(activeChannel.id, content);
  };

  const handleCreateChannel = async (name) => {
    try {
      const res = await chatApi.createChannel(name, "");
      const created = res.data;
      await loadChannels();
      setActiveChannel(created);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create channel");
    }
  };

  const handleJoinChannel = async (channel) => {
    try {
      await chatApi.joinChannel(channel.id);
      await loadChannels();
      setActiveChannel(channel);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join channel");
    }
  };

  const handleSelectChannel = (channel) => {
    setActiveChannel(channel);
  };

  const loadOlder = async () => {
    if (!activeChannel || !nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await chatApi.getMessages(activeChannel.id, nextCursor);
      const older = res.data?.messages || [];
      setMessages((prev) => [...older, ...prev]);
      setNextCursor(res.data?.nextCursor || null);
    } catch (err) {
      console.error("Error loading older messages", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleLeaveChannel = async () => {
    if (!activeChannel) return;
    const leavingId = activeChannel.id;

    try {
      await chatApi.leaveChannel(leavingId);

      const [joinedRes, allRes] = await Promise.all([
        chatApi.getJoinedChannels(),
        chatApi.getAllChannels(),
      ]);

      const joined = joinedRes.data || [];
      const all = allRes.data || [];

      setJoinedChannels(joined);
      setAllChannels(all);

      if (joined.length > 0) {
        setActiveChannel(joined[0]);
      } else {
        setActiveChannel(null);
        setMessages([]);
        setNextCursor(null);
        setChannelMembers([]);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to leave channel");
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-900 text-white
        flex flex-col md:flex-row
      "
    >
      <ChannelList
        joinedChannels={joinedChannels}
        allChannels={allChannels}
        activeId={activeChannel?.id}
        onSelectChannel={handleSelectChannel}
        onCreateChannel={handleCreateChannel}
        onJoinChannel={handleJoinChannel}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <main className="flex-1 flex flex-col border-b md:border-b-0">
          <div
            className="
              px-3 md:px-4 py-2.5
              border-b border-gray-800
              flex items-center justify-between gap-2
              bg-gray-900/95
            "
          >
            <h3 className="font-bold text-sm md:text-base truncate">
              {activeChannel ? `#${activeChannel.name}` : "No channel selected"}
            </h3>
            <div className="flex gap-2">
              {activeChannel && (
                <button
                  onClick={handleLeaveChannel}
                  className="
                    text-xs md:text-sm
                    bg-gray-700 px-2 md:px-3 py-1 rounded
                    hover:bg-gray-600 transition-colors
                  "
                >
                  Leave
                </button>
              )}
              <button
                onClick={handleLogout}
                className="
                  text-xs md:text-sm
                  bg-red-600 px-2 md:px-3 py-1 rounded
                  hover:bg-red-500 transition-colors
                "
              >
                Logout
              </button>
            </div>
          </div>

          {activeChannel ? (
            <>
              {loadingChannelData ? (
                <div className="flex-1 flex items-center justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <div className="flex-1 flex flex-col">
                    {nextCursor && (
                      <div className="p-2 flex justify-center">
                        <button
                          onClick={loadOlder}
                          disabled={loadingMore}
                          className="
                            text-xs md:text-sm
                            bg-gray-800 px-3 py-1 rounded
                            flex items-center gap-2
                          "
                        >
                          {loadingMore ? (
                            <>
                              <Spinner size="sm" /> <span>Loading...</span>
                            </>
                          ) : (
                            "Load older messages"
                          )}
                        </button>
                      </div>
                    )}
                    <MessageList messages={messages} />
                  </div>
                  <MessageInput disabled={!activeChannel} onSend={handleSend} />
                </>
              )}
            </>
          ) : loadingChannels ? (
            <div className="flex-1 flex items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm md:text-base">
              Create or join a channel from the left to start chatting.
            </div>
          )}
        </main>

        <OnlineUsers
          members={channelMembers}
          onlineUserIds={onlineUserIds}
          activeChannel={activeChannel}
        />
      </div>
    </div>
  );
}
