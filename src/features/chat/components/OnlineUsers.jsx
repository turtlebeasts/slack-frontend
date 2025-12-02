export function OnlineUsers({ members, onlineUserIds, activeChannel }) {
  const onlineSet = new Set(onlineUserIds || []);

  return (
    <aside
      className="
        w-full md:w-60 flex-shrink-0
        p-3 md:p-4
        border-t md:border-t-0 md:border-l border-gray-800
        bg-gray-900
      "
    >
      <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3">
        {activeChannel ? `Members of #${activeChannel.name}` : "Members"}
      </h2>

      {!activeChannel && (
        <div className="text-gray-500 text-xs md:text-sm">
          Select a channel to see its members.
        </div>
      )}

      {activeChannel && members?.length === 0 && (
        <div className="text-gray-500 text-xs md:text-sm">
          No members yet in this channel.
        </div>
      )}

      {activeChannel && members?.length > 0 && (
        <div className="space-y-2 max-h-32 md:max-h-[70vh] overflow-y-auto pr-1 mt-2">
          {members.map((m) => {
            const isOnline = onlineSet.has(m.id);
            return (
              <div
                key={m.id}
                className="
                  flex items-center justify-between
                  bg-gray-800 px-2 py-1.5 md:py-2 rounded
                  text-xs md:text-sm
                "
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{m.name}</div>
                  <div className="text-[11px] md:text-xs text-gray-400 truncate">
                    {m.email}
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOnline ? "bg-green-400" : "bg-gray-500"
                    }`}
                  />
                  <span className="text-[10px] md:text-xs text-gray-300">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
