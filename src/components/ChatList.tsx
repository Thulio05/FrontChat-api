type ChatListProps = {
  onSelect: (name: string) => void;
};

export function ChatList({ onSelect }: ChatListProps) {
  const contacts = [
    { name: 'Tuio', avatar: 'https://i.pravatar.cc/40?u=tuio' },
    { name: 'Evertu 🫢', avatar: 'https://i.pravatar.cc/40?u=evertu' },
    { name: 'Kaio Vivi <3', avatar: 'https://i.pravatar.cc/40?u=kaio' }
  ];

  return (
    <div className="sidebar">
      <h2>Conversas</h2>
      <ul className="chat-list">
        {contacts.map((contact) => (
          <li
            key={contact.name}
            onClick={() => onSelect(contact.name)}
            className="chat-item"
          >
            <img
              src={contact.avatar}
              alt={contact.name}
              className="avatar"
            />
            <span>{contact.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
