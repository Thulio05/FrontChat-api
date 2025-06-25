type Contact = {
  name: string;
  avatar: string;
  lastMessage: string;
};

type ChatListProps = {
  onSelect: (name: string) => void;
  contacts: Contact[];
  selected: string; // ✅ Adicione isso no tipo
};

export function ChatList({ onSelect, contacts, selected }: ChatListProps) { // ✅ Adicione `selected` aqui
  return (
    <div className="sidebar">
      <h2>Conversas</h2>
      <ul className="chat-list">
        {contacts.map((contact) => (
          <li
            key={contact.name}
            onClick={() => onSelect(contact.name)}
            className={`chat-item ${selected === contact.name ? 'selected' : ''}`} // ✅ Usa a prop corretamente
          >
            <img src={contact.avatar} alt={contact.name} className="avatar" />
            <div className="chat-info">
              <span className="chat-name">{contact.name}</span>
              <span className="chat-last">{contact.lastMessage}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
