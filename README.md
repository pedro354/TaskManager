# 🚀 React Kanban

Um gerenciador de tarefas inspirado na metodologia Kanban, desenvolvido com React e TypeScript.

A aplicação permite criar, editar, atualizar e excluir tarefas, organizando-as em colunas de acordo com seu status atual. O projeto foi desenvolvido com foco em boas práticas de desenvolvimento Frontend, gerenciamento de estado global e integração com APIs REST.

## 🌐 Demonstração

Adicione aqui o link da aplicação quando estiver publicada:

```txt
https://seu-link.vercel.app
```

---

## 📸 Preview

Adicione screenshots da aplicação aqui.

---

## ✨ Funcionalidades

* ✅ Criar tarefas
* ✅ Editar tarefas
* ✅ Excluir tarefas
* ✅ Alterar status das tarefas
* ✅ Organizar tarefas por colunas
* ✅ Controle de prioridades
* ✅ Validação de formulários
* ✅ Integração com API REST
* ✅ Atualização dinâmica da interface

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React
* TypeScript
* Vite
* Context API
* Custom Hooks
* Radix UI
* Radix Themes
* React Icons
* Zod

### Comunicação

* Fetch API

### Backend (Mock API)

* JSON Server

---

## 📂 Estrutura do Projeto

```bash
src/
│
├── components/
│   ├── CreateTaskForm
│   ├── EditTaskForm
│   ├── TaskBoard
│   └── TaskCard
│
├── contexts/
│   ├── TasksContext
│   └── TasksContextProvider
│
├── hooks/
│   └── useTasks
│
├── services/
│   └── api
│
├── entities/
│   └── Task
│
└── App.tsx
```

---

## 📋 Modelo da Tarefa

```ts
interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "doing" | "done"
  priority: "low" | "medium" | "high"
}
```

---

## 🚀 Executando o Projeto

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/react-kanban.git
```

### Entre na pasta

```bash
cd react-kanban
```

### Instale as dependências

```bash
npm install
```

### Execute o frontend

```bash
npm run dev
```

### Execute a API mockada

```bash
npx json-server db.json --port 3000
```

---

## 📚 Conceitos Praticados

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes do ecossistema React:

* Componentização
* Context API
* Custom Hooks
* Tipagem com TypeScript
* Manipulação de Formulários
* Validação com Zod
* Consumo de APIs REST
* Operações CRUD
* Organização de código em camadas
* Gerenciamento de Estado

---

## 🎯 Objetivo

Este projeto foi desenvolvido como prática de React + TypeScript, simulando um fluxo real de gerenciamento de tarefas e reforçando conceitos fundamentais utilizados em aplicações modernas.

---

## 👨‍💻 Autor

Pedro Silva

Estudante de Engenharia de Software e Desenvolvedor Fullstack JavaScript.

GitHub:
https://github.com/seu-usuario
