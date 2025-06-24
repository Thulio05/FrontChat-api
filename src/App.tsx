import { useEffect, useState } from 'react';
import { socket } from './services/socket';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import './App.css';

function App() {
  const [selectedContact, setSelectedContact] = useState('Maria');
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // 🔗 Conexão com o servidor
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('🔌 Conectado ao servidor! ID:', socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Desconectado do servidor');
    });

    // 🎧 Recebe mensagens
    socket.on('message', (data: { from: string; message: string }) => {
      console.log('📩 Mensagem recebida:', data);

      setMessages((prev) => ({
        ...prev,
        [data.from]: [...(prev[data.from] || []), data.message]
      }));
    });

    // 🧹 Limpa os listeners ao desmontar
    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  // ✉️ Envio de mensagem
  function handleSend(message: string) {
    if (!message.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), message]
    }));

    // Envia para o servidor informando para quem é a mensagem
    socket.emit('message', {
      to: selectedContact,
      message
    });

    setNewMessage('');
  }

  // 📜 Últimas mensagens para a lista de contatos
  const lastMessages = Object.fromEntries(
    Object.entries(messages).map(([contact, msgs]) => [
      contact,
      msgs[msgs.length - 1] || ''
    ])
  );

  return (
    <div className="container">
      <ChatList
        onSelect={setSelectedContact}
        lastMessages={lastMessages}
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
