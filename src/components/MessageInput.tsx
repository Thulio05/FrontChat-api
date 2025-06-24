// onde você digita e envia as mensagens
import type { FormEvent } from 'react';

type MessageInputProps = {
  newMessage: string;
  setNewMessage: (value: string) => void;
  onSend: (message: string) => void;
};

export function MessageInput({
  newMessage,
  setNewMessage,
  onSend
}: MessageInputProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSend(newMessage);
    setNewMessage('');
  }

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma mensagem..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );

}

