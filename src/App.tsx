// src/App.tsx
import { useState, useEffect } from 'react';
import { socket } from './services/socket';

export function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Ao conectar, atualiza o estado
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Conectado ao servidor com o id:', socket.id);
    });

    // Ao desconectar, atualiza o estado
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Desconectado do servidor.');
    });

    // Força o socket a se conectar
    socket.connect();

    // Função de limpeza
    return () => {
      socket.disconnect();
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <h1>Chat em Tempo Real</h1>
      <h2>Status: {isConnected ? '✅ Conectado' : '❌ Desconectado'}</h2>
    </div>
  );
}

export default App;
