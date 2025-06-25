// MessageList.tsx
type ChatMessage = {
  text: string;
  timestamp: string;
  from: 'me' | 'them';
};

type MessageListProps = {
  messages: ChatMessage[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.from}`}>
          <span className="text">{msg.text}</span>
          <span className="timestamp">{msg.timestamp}</span>
        </div>
      ))}
    </div>
  );
}
