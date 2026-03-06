![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

# 🚀 Tutorial — Setup de uma API em Node.js

---
## Unidade Curricular: Programação Web  
Curso: Tecnologias e Programação de Sistemas de Informação  
Instituição: IPVC — Escola Superior de Tecnologia e Gestão  
Ano Letivo: 2025-2026  

### Docentes
Célia Soares (P)  
Email: celiasoares@estg.ipvc.pt  

Marcelo Antunes Fernandes (Docente Responsável - T)  
Email: fernandesmarcelo@estg.ipvc.pt  

---

# � Índice

1. [Objetivo](#-objetivo)
2. [Setup Inicial](#️-setup-inicial)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [node_modules](#-node_modules)
5. [.gitignore](#-gitignore-completo)
6. [package.json — Scripts](#-packagejson--scripts)
7. [.env](#-env)
8. [server.js Base](#-serverjs-base)
9. [Exemplo 1 — Apenas OK](#-exemplo-1--apenas-ok)
10. [req e res](#-req)
11. [HTTP Status Codes](#-http-status-codes)
12. [Exemplo 2 — CRUD com Mock](#️-exemplo-2--crud-com-mock)
13. [Middleware de Erros](#-middleware-de-erros)
14. [Testar com Postman](#-testar-com-postman)
15. [Deploy no Vercel](#️-deploy-no-vercel)
16. [LAB-1 — API Gestão de Filmes](#-lab-1--api-gestão-de-filmes-)
17. [LAB-2 — API Gestão de Tarefas](#-lab-2--api-gestão-de-tarefas-)
18. [LAB-3 — API com Prisma e PostgreSQL](#-lab-3--api-com-prisma-e-postgresql-)
19. [Glossário](#-glossário)
20. [Recursos Úteis](#-recursos-úteis)

---

# �📌 Objetivo

Criar uma API simples em Node.js com Express com:

- GET
- POST
- PUT
- DELETE
- Dados mock (em memória)
- Tudo no server.js

Compreender:
- node_modules
- endpoint
- req e res
- deploy

---

# 🛠️ Setup Inicial

Criar repositório:
PW-P-LAB-{{numero-de-aluno}}

Instalar Node:
https://nodejs.org/en

Confirmar:
node -v
npm -v

Inicializar:
npm init

Instalar dependências:
npm install express nodemon cors dotenv morgan --save

---

# � Estrutura do Projeto

Após o setup, o projeto deverá ter a seguinte estrutura:

```
PW-P-LAB-{{numero-de-aluno}}/
├── node_modules/         # Dependências (NÃO enviar para GitHub)
├── .env                  # Variáveis de ambiente
├── .gitignore            # Ficheiros a ignorar pelo Git
├── package.json          # Configurações e dependências do projeto
├── package-lock.json     # Versões exatas das dependências
├── server.js             # Ficheiro principal da API
├── vercel.json           # Configuração do deploy na Vercel
└── README.md             # Documentação do projeto
```

> 💡 **Dica:** Manter uma boa estrutura de projeto desde o início facilita a manutenção e colaboração.

---

# �📦 node_modules

Criada automaticamente com:
npm install

Contém todas as bibliotecas.

Não enviar para GitHub.
Adicionar ao .gitignore:
node_modules

---

# 🚫 .gitignore Completo

Criar um ficheiro `.gitignore` na raiz do projeto com o seguinte conteúdo:

```
# Dependências
node_modules/

# Variáveis de ambiente
.env

# Logs
logs/
*.log
npm-debug.log*

# Sistema operativo
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Vercel
.vercel/
```

> ⚠️ **Importante:** O ficheiro `.env` contém informações sensíveis (passwords, tokens, etc.) e **nunca** deve ser enviado para o GitHub.

---

# 📋 package.json — Scripts

Após o `npm init`, o `package.json` é criado. Adicionar os seguintes **scripts**:

```json
{
  "name": "pw-p-lab",
  "version": "1.0.0",
  "description": "API REST - Programação Web",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["api", "express", "node"],
  "author": "O teu nome",
  "license": "ISC"
}
```

| Script | Comando | Descrição |
|--------|---------|---------- |
| `start` | `npm start` | Inicia o servidor com Node (produção) |
| `dev` | `npm run dev` | Inicia com Nodemon — reinicia automaticamente ao guardar ficheiros |

> 💡 **Nodemon** vigia os ficheiros e reinicia o servidor automaticamente sempre que detetar alterações. Ideal para desenvolvimento.

Para correr em modo de desenvolvimento:
```bash
npm run dev
```

---

# 🌱 .env

SERVER_PORT=4242

---

# 📄 server.js Base

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 3000;

---

# 🧪 EXEMPLO 1 — Apenas OK

app.get("/users", (req, res) => {
  res.status(200).json({ message: "OK - GET users" });
});

app.post("/users", (req, res) => {
  res.status(200).json({ message: "OK - POST users" });
});

app.put("/users/:id", (req, res) => {
  res.status(200).json({ message: "OK - PUT users" });
});

app.delete("/users/:id", (req, res) => {
  res.status(200).json({ message: "OK - DELETE users" });
});

---

# 🧠 req

Request.
Contém:
req.params
req.body
req.query

---

# 📤 res

Response.
Envia dados ao cliente:

res.status(200).json({ message: "OK" });

### Métodos mais usados de `res`:

| Método | Descrição | Exemplo |
|--------|-----------|---------- |
| `res.json()` | Envia resposta JSON | `res.json({ name: "Ana" })` |
| `res.status()` | Define o status code | `res.status(201)` |
| `res.send()` | Envia texto simples | `res.send("Hello")` |
| `res.redirect()` | Redireciona | `res.redirect("/home")` |

---

# 📊 HTTP Status Codes

Tabela de referência dos códigos HTTP mais comuns:

| Código | Nome | Descrição | Quando usar |
|--------|------|-----------|------------|
| **200** | OK | Sucesso | GET, PUT com sucesso |
| **201** | Created | Recurso criado | POST com sucesso |
| **204** | No Content | Sem conteúdo | DELETE com sucesso |
| **400** | Bad Request | Pedido inválido | Dados em falta ou inválidos |
| **404** | Not Found | Não encontrado | Recurso não existe |
| **409** | Conflict | Conflito | Recurso duplicado |
| **500** | Internal Server Error | Erro interno | Erro inesperado no servidor |

### Categorias:

| Gama | Significado |
|------|------------|
| `1xx` | Informacional |
| `2xx` | ✅ Sucesso |
| `3xx` | Redirecionamento |
| `4xx` | ❌ Erro do Cliente |
| `5xx` | 💥 Erro do Servidor |

---

# 🗂️ EXEMPLO 2 — CRUD com Mock

```js
let users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "João", email: "joao@email.com" }
];
```

### GET /users — Listar todos

```js
app.get("/users", (req, res) => {
  res.status(200).json({ data: users });
});
```

### GET /users/:id — Obter um

```js
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  res.status(200).json({ data: user });
});
```

### POST /users — Criar

```js
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validação
  if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});
```

### PUT /users/:id — Atualizar

```js
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
  }

  users[index] = { id, name, email };
  res.status(200).json({ data: users[index] });
});
```

### DELETE /users/:id — Apagar

```js
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "Utilizador eliminado com sucesso" });
});
```

### Iniciar o servidor

```js
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});
```

> 💡 Este bloco `app.listen()` deve estar **sempre no final** do ficheiro `server.js`.

---

# 🛡️ Middleware de Erros

Adicionar no final do `server.js` (antes do `app.listen`):

```js
// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno do servidor" });
});
```

Ordem recomendada no `server.js`:
1. Imports e configuração
2. Middlewares (`cors`, `json`, `morgan`)
3. Rotas (GET, POST, PUT, DELETE)
4. Middleware de erros (404 e 500)
5. `app.listen()`

---

# 🧪 Testar com Postman

O **Postman** é uma ferramenta para testar APIs sem precisar de frontend.

### Instalação
Descarregar em: https://www.postman.com/downloads/

### Como testar cada endpoint:

#### 1. GET — Listar todos os utilizadores
| Campo | Valor |
|-------|-------|
| Método | `GET` |
| URL | `http://localhost:4242/users` |
| Body | Nenhum |

#### 2. GET — Obter um utilizador
| Campo | Valor |
|-------|-------|
| Método | `GET` |
| URL | `http://localhost:4242/users/1` |
| Body | Nenhum |

#### 3. POST — Criar utilizador
| Campo | Valor |
|-------|-------|
| Método | `POST` |
| URL | `http://localhost:4242/users` |
| Body → raw → JSON | Ver abaixo |

```json
{
  "name": "Maria",
  "email": "maria@email.com"
}
```

#### 4. PUT — Atualizar utilizador
| Campo | Valor |
|-------|-------|
| Método | `PUT` |
| URL | `http://localhost:4242/users/1` |
| Body → raw → JSON | Ver abaixo |

```json
{
  "name": "Ana Silva",
  "email": "ana.silva@email.com"
}
```

#### 5. DELETE — Apagar utilizador
| Campo | Valor |
|-------|-------|
| Método | `DELETE` |
| URL | `http://localhost:4242/users/2` |
| Body | Nenhum |

> 💡 **Dica:** Criar uma **Collection** no Postman para organizar todos os pedidos do projeto.

---

# ☁️ Deploy no Vercel

Criar conta em:
https://vercel.com

Instalar CLI:
npm install -g vercel

Login:
vercel login

Deploy:
vercel

### Ficheiro `vercel.json`

Criar o ficheiro `vercel.json` na raiz do projeto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Exportar o `app` para a Vercel

No final do `server.js`, alterar o `app.listen()` para:

```js
// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

// Para a Vercel
module.exports = app;
```

> ⚠️ **Nota:** A Vercel precisa que o `app` seja exportado com `module.exports`. O `app.listen()` só deve correr localmente.

---

# 🧪 LAB-1 — API Gestão de Filmes 🎬

Criar array:

let movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "Interstellar", year: 2014 }
];

Implementar:
GET /movies
GET /movies/:id
POST /movies
PUT /movies/:id
DELETE /movies/:id

Requisitos:
- Dados mock
- Validar ID
- Status codes corretos
- Testar no Postman

---

---

# 🧪 LAB-2 — API Gestão de Tarefas ✅

Criar array:

```js
let tasks = [
  { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
  { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];
```

Implementar:
- `GET /tasks` — Listar todas as tarefas
- `GET /tasks/:id` — Obter uma tarefa
- `GET /tasks?completed=true` — Filtrar por estado (usar `req.query`)
- `POST /tasks` — Criar tarefa
- `PUT /tasks/:id` — Atualizar tarefa
- `PATCH /tasks/:id/toggle` — Alternar estado `completed`
- `DELETE /tasks/:id` — Apagar tarefa

Requisitos:
- Dados mock
- Validar campos obrigatórios (`title`, `priority`)
- Validar que `priority` seja `"low"`, `"medium"` ou `"high"`
- Status codes corretos (200, 201, 400, 404)
- Testar todos os endpoints no Postman
- Fazer deploy na Vercel

> 💡 **Desafio extra:** Implementar `GET /tasks/stats` que retorna o número total de tarefas, quantas estão completas e quantas estão pendentes.

---

# 🧪 LAB-3 — API com Prisma e PostgreSQL 🗄️

Neste laboratório vais migrar a API de tarefas do LAB-2 para usar uma base de dados PostgreSQL real através do **Prisma ORM**.

---

## 📦 Instalação das dependências

```bash
npm install prisma @prisma/client --save
```

---

## ⚙️ Inicializar o Prisma

```bash
npx prisma init --datasource-provider postgresql
```

Este comando cria:
- `prisma/schema.prisma` — definição do schema da base de dados
- `prisma.config.ts` — configuração do Prisma (URL da base de dados)
- `.env` — ficheiro de variáveis de ambiente (já existente)

---

## 🌱 Configurar o `.env`

Adicionar a variável `DATABASE_URL` ao ficheiro `.env`:

```
SERVER_PORT=4242
DATABASE_URL="postgresql://UTILIZADOR:PASSWORD@localhost:5432/lab3db?schema=public"
```

> ⚠️ **Importante:** Substituir `UTILIZADOR`, `PASSWORD` e `lab3db` pelos valores da tua instalação PostgreSQL.

---

## 🗂️ Estrutura do Projeto (LAB-3)

```
PW-P-LAB-{{numero-de-aluno}}/
├── generated/
│   └── prisma/           # Cliente Prisma gerado (NÃO enviar para GitHub)
├── prisma/
│   ├── schema.prisma     # Modelo da base de dados
│   └── migrations/       # Histórico de migrações
├── prisma.config.ts      # Configuração do Prisma
├── .env                  # Variáveis de ambiente (NÃO enviar para GitHub)
├── .env.example          # Exemplo de variáveis de ambiente
├── server.js             # Ficheiro principal da API
└── ...
```

> 💡 Adicionar `generated/` ao `.gitignore` para não enviar o cliente gerado para o GitHub.

---

## 📐 Definir o modelo no `prisma/schema.prisma`

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  priority  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🔄 Criar a migração e gerar o cliente

```bash
npx prisma migrate dev --name init
```

Este comando:
1. Cria as tabelas na base de dados
2. Gera o cliente Prisma em `generated/prisma`

> 💡 Sempre que alteres o `schema.prisma`, deves correr `npx prisma migrate dev` para aplicar as alterações.

---

## 💻 `server.js` — API de Tarefas com Prisma

```js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PrismaClient } = require("./generated/prisma");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 3000;
```

### GET /tasks — Listar todas as tarefas

```js
app.get("/tasks", async (req, res) => {
  try {
    const { completed } = req.query;

    const where = completed !== undefined
      ? { completed: completed === "true" }
      : {};

    const tasks = await prisma.task.findMany({ where });
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### GET /tasks/:id — Obter uma tarefa

```js
app.get("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### GET /tasks/stats — Estatísticas das tarefas

```js
app.get("/tasks/stats", async (req, res) => {
  try {
    const total = await prisma.task.count();
    const completed = await prisma.task.count({ where: { completed: true } });
    const pending = total - completed;

    res.status(200).json({ data: { total, completed, pending } });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### POST /tasks — Criar tarefa

```js
app.post("/tasks", async (req, res) => {
  try {
    const { title, priority } = req.body;

    if (!title || !priority) {
      return res.status(400).json({ message: "Campos 'title' e 'priority' são obrigatórios" });
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "O campo 'priority' deve ser 'low', 'medium' ou 'high'" });
    }

    const task = await prisma.task.create({
      data: { title, priority }
    });

    res.status(201).json({ data: task });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### PUT /tasks/:id — Atualizar tarefa

```js
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, priority, completed } = req.body;

    if (!title || !priority) {
      return res.status(400).json({ message: "Campos 'title' e 'priority' são obrigatórios" });
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "O campo 'priority' deve ser 'low', 'medium' ou 'high'" });
    }

    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { title, priority, completed: completed ?? existing.completed }
    });

    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### PATCH /tasks/:id/toggle — Alternar estado completed

```js
app.patch("/tasks/:id/toggle", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.task.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { completed: !existing.completed }
    });

    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### DELETE /tasks/:id — Apagar tarefa

```js
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await prisma.task.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await prisma.task.delete({ where: { id } });
    res.status(200).json({ message: "Tarefa eliminada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
```

### Middleware de erros e iniciar o servidor

```js
// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});
```

---

## 🔧 Comandos Prisma Úteis

| Comando | Descrição |
|---------|-----------|
| `npx prisma migrate dev --name <nome>` | Cria e aplica uma nova migração |
| `npx prisma migrate deploy` | Aplica migrações em produção |
| `npx prisma studio` | Interface gráfica para explorar a base de dados |
| `npx prisma db push` | Sincroniza o schema sem criar migração (protótipo) |
| `npx prisma generate` | Regenera o cliente Prisma |

---

## 📋 Requisitos do LAB-3

- Usar PostgreSQL como base de dados
- Configurar o Prisma com o modelo `Task`
- Implementar todos os endpoints do LAB-2 com Prisma:
  - `GET /tasks` — Listar todas (com filtro `?completed=true/false`)
  - `GET /tasks/stats` — Estatísticas (total, completas, pendentes)
  - `GET /tasks/:id` — Obter uma tarefa
  - `POST /tasks` — Criar tarefa
  - `PUT /tasks/:id` — Atualizar tarefa
  - `PATCH /tasks/:id/toggle` — Alternar estado `completed`
  - `DELETE /tasks/:id` — Apagar tarefa
- Validar campos obrigatórios (`title`, `priority`)
- Validar que `priority` seja `"low"`, `"medium"` ou `"high"`
- Status codes corretos (200, 201, 400, 404, 500)
- Usar `try/catch` em todos os endpoints para tratamento de erros
- Testar todos os endpoints no Postman

> 💡 **Dica:** Usa o `npx prisma studio` para ver e editar os dados diretamente na base de dados através de uma interface gráfica.

---

# 🎯 Fim


---

# 📘 Explicação Detalhada da Configuração

## 🌱 O que é o ficheiro `.env`?

```
SERVER_PORT=4242
```

O ficheiro `.env` (environment file) serve para guardar **variáveis de ambiente**.

Estas variáveis:

- Guardam configurações do projeto
- Não ficam escritas diretamente no código
- Permitem alterar valores sem modificar o programa
- São muito usadas para portas, passwords, tokens e configurações de base de dados

No nosso caso:

`SERVER_PORT=4242`  
Define a porta onde o servidor vai arrancar.

---

## 📄 Explicação do `server.js` Base

```js
require("dotenv").config();
```

Carrega o ficheiro `.env` e disponibiliza as variáveis através de:

```js
process.env.NOME_DA_VARIAVEL
```

---

```js
const express = require("express");
```

Importa o **Express**, que é o framework que usamos para criar a API.

---

```js
const cors = require("cors");
```

Importa o **CORS**.

CORS significa *Cross-Origin Resource Sharing*.

Permite que a nossa API possa ser chamada por aplicações externas (por exemplo, um frontend em React).

---

```js
const morgan = require("morgan");
```

Importa o **Morgan**, que serve para mostrar no terminal:

- Tipo de pedido (GET, POST, etc.)
- URL chamada
- Tempo de resposta
- Status code

Ajuda muito no debugging.

---

```js
const app = express();
```

Cria a aplicação Express.

É aqui que vamos definir os endpoints.

---

```js
app.use(cors());
```

Ativa o CORS para todas as rotas.

---

```js
app.use(express.json());
```

Permite que a API receba dados em formato JSON no body dos pedidos (POST e PUT).

Sem esta linha, `req.body` não funcionaria.

---

```js
app.use(morgan("dev"));
```

Ativa o Morgan no modo "dev".

Mostra logs simples e organizados no terminal.

---

```js
const PORT = process.env.SERVER_PORT || 3000;
```

Define a porta do servidor.

- Primeiro tenta ler do `.env`
- Se não existir, usa 3000 como valor por defeito

Isto permite flexibilidade entre desenvolvimento e produção.

---

# 📖 Glossário

| Termo | Definição |
|-------|----------|
| **API** | Application Programming Interface — conjunto de endpoints que permitem comunicação entre sistemas |
| **REST** | Representational State Transfer — arquitetura para APIs baseada em recursos e métodos HTTP |
| **Endpoint** | URL específica que responde a pedidos HTTP (ex: `/users`) |
| **Middleware** | Função que interceta o pedido antes de chegar à rota final |
| **CRUD** | Create, Read, Update, Delete — as 4 operações básicas |
| **Mock** | Dados simulados em memória para testes |
| **Rota** | Combinação de método HTTP + URL (ex: `GET /users`) |
| **Body** | Corpo do pedido HTTP, usado em POST e PUT para enviar dados |
| **Params** | Parâmetros na URL (ex: `/users/:id` → `req.params.id`) |
| **Query** | Parâmetros de consulta na URL (ex: `/users?name=Ana` → `req.query.name`) |
| **Status Code** | Código numérico que indica o resultado do pedido (200, 404, 500...) |
| **JSON** | JavaScript Object Notation — formato de dados usado nas APIs |
| **Deploy** | Publicar a aplicação num servidor acessível pela internet |
| **Nodemon** | Ferramenta que reinicia automaticamente o servidor ao detetar alterações nos ficheiros |
| **CORS** | Cross-Origin Resource Sharing — permite pedidos de origens diferentes |
| **dotenv** | Biblioteca para carregar variáveis de ambiente a partir do ficheiro `.env` |
| **ORM** | Object-Relational Mapper — camada de abstração entre código e base de dados |
| **Prisma** | ORM moderno para Node.js que simplifica o acesso a bases de dados relacionais |
| **PostgreSQL** | Sistema de gestão de base de dados relacional open-source e robusto |
| **Schema** | Definição da estrutura da base de dados (tabelas, campos, tipos) |
| **Migração** | Script que aplica alterações ao schema da base de dados de forma controlada |
| **PrismaClient** | Classe gerada pelo Prisma para interagir com a base de dados de forma tipada |

---

# 🔗 Recursos Úteis

| Recurso | Link |
|---------|------|
| Documentação Node.js | https://nodejs.org/docs/latest/api/ |
| Documentação Express | https://expressjs.com/ |
| Postman Learning | https://learning.postman.com/ |
| Vercel Docs | https://vercel.com/docs |
| HTTP Status Codes | https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status |
| REST API Tutorial | https://restfulapi.net/ |
| Nodemon | https://nodemon.io/ |
| Shields.io (badges) | https://shields.io/ |
| GitHub Student Pack | https://education.github.com/pack |
| MDN Web Docs | https://developer.mozilla.org/pt-BR/ |
| Prisma Docs | https://www.prisma.io/docs |
| Prisma Schema Reference | https://www.prisma.io/docs/orm/reference/prisma-schema-reference |
| PostgreSQL Download | https://www.postgresql.org/download/ |

---
