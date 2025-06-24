import './App.css';
import { useState } from 'react';


function App() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault(); // impede o recarregamento da página
    if (newMessage.trim() === '') return; // ignora mensagens vazias

    setMessages(prev => [...prev, newMessage]); // adiciona a nova mensagem
    setNewMessage(''); // limpa o input
  }


  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Conversas</h2>
        <ul className="chat-list">
          <li>Maria</li>
          <li>João</li>
          <li>Ana</li>
        </ul>
      </aside>

      <main className="chat">
        <div className="messages">
          {messages.map((msg, index) => (
          <div key={index} className="message sent">
            {msg}
          </div>
          ))}
        </div>
        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Digita aí campeão..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
}

export default App;
