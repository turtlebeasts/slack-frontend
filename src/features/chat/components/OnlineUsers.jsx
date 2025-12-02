export function OnlineUsers({ members, onlineUserIds, activeChannel }) {
  const onlineSet = new Set(onlineUserIds || []);

  return (
    <aside className="w-60 p-4 border-l border-gray-800 bg-gray-900">
      <h2 className="text-lg font-bold mb-3">
        {activeChannel ? `Members of #${activeChannel.name}` : "Members"}
      </h2>

      {!activeChannel && (
        <div className="text-gray-500 text-sm">
          Select a channel to see its members.
        </div>
      )}

      {activeChannel && members?.length === 0 && (
        <div className="text-gray-500 text-sm">
          No members yet in this channel.
        </div>
      )}

      {activeChannel && members?.length > 0 && (
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {members.map((m) => {
            const isOnline = onlineSet.has(m.id);
            return (
              <div
                key={m.id}
                className="flex items-center justify-between bg-gray-800 px-2 py-1 rounded text-sm"
              >
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.email}</div>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isOnline ? "bg-green-400" : "bg-gray-500"
                    }`}
                  />
                  <span className="text-xs text-gray-300">
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
