import { useState, useMemo } from "react";

export function ChannelList({
  joinedChannels,
  allChannels,
  activeId,
  onSelectChannel,
  onCreateChannel,
  onJoinChannel,
}) {
  const [newName, setNewName] = useState("");

  const joinedIds = useMemo(
    () => new Set(joinedChannels.map((c) => c.id)),
    [joinedChannels]
  );

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onCreateChannel(newName.trim());
    setNewName("");
  };

  return (
    <aside
      className="
        w-full md:w-72 flex-shrink-0
        p-3 md:p-4
        border-b md:border-b-0 md:border-r border-gray-800
        flex flex-col bg-gray-900
      "
    >
      <h2 className="text-base md:text-lg font-bold mb-3">Channels</h2>

      {/* Create channel */}
      <form onSubmit={handleCreate} className="mb-3 md:mb-4 flex gap-2">
        <input
          className="flex-1 px-2.5 py-2 rounded bg-gray-800 text-xs md:text-sm
                     placeholder:text-gray-400
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Create new channel"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="bg-blue-600 px-2 md:px-3 py-1 rounded text-xs md:text-sm whitespace-nowrap
                     hover:bg-blue-500 transition-colors"
        >
          Create
        </button>
      </form>

      {/* Joined channels */}
      <div className="mb-3">
        <h3 className="text-xs md:text-sm font-semibold text-gray-300 mb-2">
          My channels
        </h3>
        {joinedChannels.length === 0 && (
          <div className="text-[11px] md:text-xs text-gray-500">
            You haven't joined any channels yet.
          </div>
        )}
        <div className="space-y-1 max-h-32 md:max-h-48 overflow-y-auto pr-1">
          {joinedChannels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => onSelectChannel(ch)}
              className={`p-2 rounded cursor-pointer text-xs md:text-sm ${
                activeId === ch.id
                  ? "bg-blue-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              #{ch.name}
            </div>
          ))}
        </div>
      </div>

      {/* All channels section for joining */}
      <div className="mt-3 md:mt-4 border-t border-gray-800 pt-3">
        <h3 className="text-xs md:text-sm font-semibold text-gray-300 mb-2">
          Available channels
        </h3>
        <div className="space-y-1 max-h-32 md:max-h-48 overflow-y-auto pr-1">
          {allChannels.map((ch) => (
            <div
              key={ch.id}
              className="flex items-center justify-between bg-gray-800 px-2 py-1.5 rounded text-[11px] md:text-xs"
            >
              <span
                className="cursor-pointer truncate"
                onClick={() => joinedIds.has(ch.id) && onSelectChannel(ch)}
              >
                #{ch.name}
              </span>
              {joinedIds.has(ch.id) ? (
                <span className="text-green-400 text-[10px]">Joined</span>
              ) : (
                <button
                  className="bg-blue-600 px-2 py-1 rounded text-[10px]
                             hover:bg-blue-500 transition-colors"
                  onClick={() => onJoinChannel(ch)}
                >
                  Join
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
