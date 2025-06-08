// src/App.tsx
import { useState, useEffect } from 'react';
import { socket } from './services/socket'; // Importamos nosso socket

export function App() {
  // Um estado para guardar e exibir se estamos conectados
  const [isConnected, setIsConnected] = useState(false);

  // O useEffect é ideal para gerenciar conexões e outros "efeitos colaterais"
  useEffect(() => {
    // Quando o evento 'connect' do socket for recebido, atualizamos nosso estado
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Conectado ao servidor com o id:', socket.id);
    });

    // Quando o evento 'disconnect' for recebido...
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Desconectado do servidor.');
    });

    // Agora, mandamos o socket conectar de fato
    socket.connect();

    // Esta função de retorno do useEffect é uma "função de limpeza".
    // Ela será executada quando o componente sair da tela, garantindo
    // que a conexão seja encerrada de forma limpa.
    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez

  return (
    <div>
      <h1>Chat em Tempo Real</h1>
      <h2>Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}</h2>
    </div>
  );
}

export default App;