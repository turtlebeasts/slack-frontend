export function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-4 py-3 space-y-2 md:space-y-3">
      {messages.map((m) => {
        const name = m.user?.name || "User";
        const content = m.content;

        return (
          <div
            key={m.id}
            className="
              bg-gray-800/90 rounded-md 
              px-3 py-2 md:px-4 md:py-2.5
              text-sm md:text-[15px]
              break-words
            "
          >
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <span className="font-semibold text-blue-300 text-xs md:text-sm truncate">
                {name}
              </span>
              {m.created_at && (
                <span className="text-[10px] md:text-xs text-gray-400 flex-shrink-0">
                  {new Date(m.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            <p className="text-gray-100 text-xs md:text-sm whitespace-pre-wrap">
              {content}
            </p>
          </div>
        );
      })}
      {messages.length === 0 && (
        <div className="h-full flex items-center justify-center text-xs md:text-sm text-gray-500">
          No messages yet. Start the conversation 👋
        </div>
      )}
    </div>
  );
}
