// onde as mensagens aparecem
type MessageListProps = {
  messages: string[];
};

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className="message sent">
          {msg}
        </div>
      ))}
    </div>
  );
}