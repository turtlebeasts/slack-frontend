import { useState } from "react";

export function MessageInput({ disabled, onSend }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="
        p-2 md:p-3 
        border-t border-gray-800 
        flex gap-2 items-center
        bg-gray-900
      "
    >
      <input
        className="
          flex-1 
          px-3 py-2 md:py-2.5 
          rounded-md bg-gray-800 text-sm
          placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white
        "
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      />

      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="
          px-3 md:px-4 py-2 
          rounded-md text-sm font-medium 
          bg-blue-600 hover:bg-blue-500 transition-colors 
          text-white
          whitespace-nowrap
          disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed
        "
      >
        Send
      </button>
    </form>
  );
}
