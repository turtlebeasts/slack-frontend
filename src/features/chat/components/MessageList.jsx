export function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((m) => (
        <div key={m.id} className="bg-gray-800 p-2 rounded">
          <b>{m.user?.name || "User"}: </b>
          {m.content}
        </div>
      ))}
    </div>
  );
}
