# Agrotech

**Observação**: Este projeto está atualmente em desenvolvimento. Algumas funcionalidades podem estar incompletas ou sujeitas a alterações.

## Objetivo

Desenvolver um aplicativo que promova o compartilhamento de conhecimentos e a colaboração entre agricultores, oferecendo um ambiente de fórum onde os usuários possam interagir, tirar dúvidas, trocar experiências e buscar soluções para problemas relacionados às práticas agrícolas. Além disso, o aplicativo fornecerá informações técnicas e especializadas com base nas APIs da Embrapa, visando melhorar as práticas agrícolas e aumentar a produtividade no campo.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React.js
- **Hospedagem**: Render, Vercel, MongoDB Atlas

## Dependências do Projeto

### Backend

- Axios
- cors
- firebase-admin
- multer
- jsonwebtoken
- mongoose
- express
- dotenv

### Frontend

- mui materials
- phosphor react

## Estrutura do Projeto

```
/repositorio
│
├── /backend
│   │   ├── helpers/
│   │   ├── db/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── package.json
│   ├── index.js
│   └── README.md
│
├── /frontend
│   ├── /src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── style/
│   │   ├── utils/
│   │   └── Assets/
│   ├── package.json
│   └── README.md
|   ├── vercel.json
│   └── index.html
```

## Frontend

### Tecnologias Utilizadas

- React
- mui materials
- phosphor react

### Estrutura de Pastas

- `components/`: Componentes reutilizáveis.
- `hooks/`: Custom hooks para lógica de estado e efeitos.
- `style/`: Estilos globais e temáticos.
- `utils/`: Funções utilitárias.
- `Assets/`: Recursos estáticos como imagens e ícones.

### Exemplo de Componente

```jsx
// src/components/ExemploComponente.js
import React from "react";

const ExemploComponente = () => {
  return (
    <div>
      <h1>Olá, mundo!</h1>
    </div>
  );
};

export default ExemploComponente;
```

## Backend

### Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Axios
- cors
- firebase-admin
- multer
- jsonwebtoken
- mongoose
- dotenv

### Estrutura de Pastas

- `helpers/`: Funções auxiliares.
- `db/`: Configurações do banco de dados.
- `controllers/`: Lógica de controle das rotas.
- `models/`: Definições de modelos de dados.
- `routes/`: Definições de rotas da API.

### Exemplo de Rota

```js
import express from "express";
import controllerPost from "../controller/controllerPostagem.js";
import uploadHandler from "../helpers/UploadImagem.js";

const rotasPost = express.Router();
rotasPost.get("/", controllerPost.listarPost);
rotasPost.get("/meusPosts", controllerPost.meusPosts);
rotasPost.post("/novoPost", uploadHandler, controllerPost.criarPost);

export default rotasPost;
```

## Link do Projeto em Produção

[Agrotech em produção](https://agro-tech-git-main-matheusgustavoos-projects.vercel.app/)
