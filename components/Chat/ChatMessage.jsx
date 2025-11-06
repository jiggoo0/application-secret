export default function ChatMessage({ msg, isCurrentUser }) {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] break-words rounded-xl p-2 text-sm ${
          isCurrentUser
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        <div>{msg.message_text}</div>
        <div className="mt-1 text-right text-[10px] opacity-60">
          {new Date(msg.created_at).toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
