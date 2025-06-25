// App.tsx
import { useEffect, useState } from 'react';
import { socket } from './services/socket';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import './App.css';

// Tipagem para mensagens com metadados
interface ChatMessage {
  text: string;
  timestamp: string;
  from: 'me' | 'them';
}

function App() {
  const [selectedContact, setSelectedContact] = useState('Tuio');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('message', (data: { from: string; message: string }) => {
      const msg: ChatMessage = {
        text: data.message,
        timestamp: new Date().toLocaleTimeString(),
        from: 'them'
      };
      setMessages((prev) => ({
        ...prev,
        [data.from]: [...(prev[data.from] || []), msg]
      }));
    });

    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  function handleSend(message: string) {
    const newMsg: ChatMessage = {
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      from: 'me'
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMsg]
    }));

    socket.emit('message', message);

    // Simula resposta automática após 1.5s
    setTimeout(() => {
      const autoResponse: ChatMessage = {
        text: 'Recebido! 👍',
        timestamp: new Date().toLocaleTimeString(),
        from: 'them'
      };
      setMessages((prev) => ({
        ...prev,
        [selectedContact]: [...(prev[selectedContact] || []), autoResponse]
      }));
    }, 1500);
  }

  const [contacts, setContacts] = useState([
    { name: 'Tuio', avatar: 'https://i.pravatar.cc/40?u=tuio', lastMessage: '' },
    { name: 'Evertu 🫢', avatar: 'https://i.pravatar.cc/40?u=evertu', lastMessage: '' },
    { name: 'Kaio Vivi <3', avatar: 'https://i.pravatar.cc/40?u=kaio', lastMessage: '' }
  ]);

  useEffect(() => {
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        lastMessage: messages[c.name]?.slice(-1)[0]?.text || ''
      }))
    );
  }, [messages]);

  return (
    <div className="container">
      <ChatList
        onSelect={setSelectedContact}
        contacts={contacts}
        selected={selectedContact}
      />

      <main className="chat">
        <div className="chat-header">
          <h2>{selectedContact}</h2>
        </div>
        <h2 className="status">
          Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}
        </h2>
        <MessageList messages={messages[selectedContact] || []} />
        <MessageInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}

export default App;
