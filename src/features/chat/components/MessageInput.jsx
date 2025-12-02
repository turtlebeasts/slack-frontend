import { useState } from "react";

export function MessageInput({ disabled, onSend }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={submit} className="p-3 border-t border-gray-800 flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-gray-800"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />
      <button className="bg-blue-600 px-4 rounded" disabled={disabled}>
        Send
      </button>
    </form>
  );
}
