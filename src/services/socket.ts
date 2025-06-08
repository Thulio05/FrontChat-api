import { io } from 'socket.io-client';

// A URL do seu backend. Lembre-se que ele roda na porta 3000.
const URL = 'http://localhost:3000';

// Criamos a instância do socket que será usada em toda a aplicação.
export const socket = io(URL, {
  autoConnect: false // Impede a conexão automática. Nós controlaremos quando conectar.
});