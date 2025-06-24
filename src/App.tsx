import { useEffect, useState } from 'react';
import { socket } from './services/socket';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import './App.css';

function App() {
  const [selectedContact, setSelectedContact] = useState('Maria'); // valor inicial opcional
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // 1️⃣ Conecta no servidor assim que o app carrega
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

    // 2️⃣ Escuta mensagens recebidas do servidor
    socket.on('message', (msg: string) => {
      console.log('📩 Mensagem recebida:', msg);
      setMessages((prev) => [...prev, msg]);
    });

    // 3️⃣ Limpa os listeners quando sair do componente
    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  // 4️⃣ Quando enviar mensagem
  function handleSend(message: string) {
    setMessages((prev) => [...prev, message]);
    socket.emit('message', message); // envia para o servidor
  }

  return (
    <div className="container">
      <ChatList onSelect={setSelectedContact} />
      <main className="chat">
        <div className="chat-header">
          <h2>{selectedContact}</h2>
        </div>
        <h2 className="status">
          Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}
        </h2>
        <MessageList messages={messages} />
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
