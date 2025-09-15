API responsável pela comunicação entre o FrontChat (aplicação web de chat) e o backend.
Ela gerencia autenticação de usuários, criação e gerenciamento de chats, envio e listagem de mensagens.

Tecnologias Utilizadas:

Node.js + Express — servidor e rotas HTTP

Prisma ORM — acesso e gerenciamento do banco de dados

PostgreSQL — banco de dados relacional

JWT (JSON Web Token) — autenticação e segurança

bcrypt — criptografia de senhas

Socket.io — comunicação em tempo real (mensagens instantâneas)

Estrutura do Projeto
FrontChat-api/
│-- src/
│   │-- controllers/   # Lógica de cada recurso
│   │-- middlewares/   # Middlewares de autenticação/erros
│   │-- routes/        # Definição das rotas da API
│   │-- services/      # Regras de negócio
│   │-- prisma/        # Configuração do ORM
│   └-- index.ts       # Ponto de entrada do servidor
│
│-- package.json
│-- prisma/schema.prisma
│-- tsconfig.json

A API estará rodando em:
http://localhost:4000

Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e compartilhar.
