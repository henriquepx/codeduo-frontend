<table align="right">
  <tr>
    <td>
      <a href="README.md">🇺🇸 English</a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="readme-pt.md">🇧🇷 Português</a>
    </td>
  </tr>
</table>

# CodeDuo Front-end

CodeDuo é uma plataforma de edição de código colaborativa que permite aos usuários criar salas de codificação em tempo real, compartilhar e editar código com outras pessoas. A plataforma suporta autenticação de usuários, perfil personalizado e integração com Firebase para login via Google.

## Funcionalidades

- Autenticação de usuário com Firebase (login via Google e email/senha)
- Salas de codificação em tempo real com Socket.io
- Editor de código baseado no Monaco Editor
- Seleção de avatares personalizados
- Persistência de dados com Redux e Redux Persist

## Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca JavaScript para construir interfaces de usuário. [Documentação](https://reactjs.org/docs/getting-started.html)
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código. [Documentação](https://www.typescriptlang.org/docs/)
- **styled-components**: Biblioteca para estilização com CSS-in-JS. [Documentação](https://styled-components.com/docs)
- **Redux**: Gerenciamento de estado global da aplicação. [Documentação](https://redux.js.org/introduction/getting-started)
- **Redux Persist**: Persistência de estado do Redux entre sessões. [Documentação](https://github.com/rt2zz/redux-persist)
- **React Router**: Roteamento dinâmico em aplicações React. [Documentação](https://reactrouter.com/docs/en/v6)
- **React Hook Form**: Biblioteca para manipulação de formulários em React. [Documentação](https://react-hook-form.com/get-started)
- **axios**: Cliente HTTP para realizar requisições à API. [Documentação](https://axios-http.com/docs/intro)
- **Socket.io-client**: Biblioteca para comunicação em tempo real via WebSockets. [Documentação](https://socket.io/docs/v4/client-api/)
- **monaco-editor**: Editor de código utilizado no Visual Studio Code, embutido na aplicação web. [Documentação](https://microsoft.github.io/monaco-editor/)
- **react-monaco-editor**: Componente React para o Monaco Editor. [Documentação](https://github.com/react-monaco-editor/react-monaco-editor)
- **js-cookie**: Biblioteca para manipulação de cookies. [Documentação](https://github.com/js-cookie/js-cookie)
- **zod**: Biblioteca para validação de esquemas e tipos em TypeScript. [Documentação](https://zod.dev/)

### Backend

- **Express**: Framework web para Node.js. [Documentação](https://expressjs.com/)
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados. [Documentação](https://www.mongodb.com/docs/manual/)
- **Mongoose**: Biblioteca para modelagem de dados no MongoDB. [Documentação](https://mongoosejs.com/docs/)
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT. [Documentação](https://github.com/auth0/node-jsonwebtoken)
- **bcrypt**: Biblioteca para hash de senhas. [Documentação](https://www.npmjs.com/package/bcrypt)

### Ferramentas de Desenvolvimento

- **Vite**: Ferramenta de build rápida para desenvolvimento de projetos front-end. [Documentação](https://vitejs.dev/guide/)
- **ESLint**: Linter para encontrar e corrigir problemas no código JavaScript/TypeScript. [Documentação](https://eslint.org/docs/user-guide/getting-started)
- **Prettier**: Ferramenta de formatação de código. [Documentação](https://prettier.io/docs/en/)
- **TypeScript ESLint**: Conjunto de regras ESLint para TypeScript. [Documentação](https://typescript-eslint.io/)


## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

\`\`\`plaintext
src
├── assets
├── components
│   ├── dropdown
│   ├── form
│   ├── formregister
│   ├── logo
│   ├── oauth
├── pages
│   ├── home
│   ├── login
│   ├── register
│   ├── room
├── redux
├── routes
\`\`\`

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### \`npm run dev\`

Roda a aplicação em modo de desenvolvimento.Abra [http://localhost:3000](http://localhost:3000) para ver no navegador.

### \`npm run build\`

Cria a aplicação para produção na pasta \`build\`.Ele corretamente agrupa o React no modo de produção e otimiza a build para o melhor desempenho.

### \`npm run lint\`

Roda o linter para verificar possíveis erros de código e garantir conformidade com as regras definidas.

### \`npm run preview\`

Executa uma pré-visualização da build de produção.

## Dependências

Aqui estão listadas as dependências e devDependencies do projeto:

### Dependências

\`\`\`json
{
  "@hookform/resolvers": "^3.8.0",
  "@reduxjs/toolkit": "^2.2.6",
  "@types/uuid": "^10.0.0",
  "axios": "^1.7.2",
  "firebase": "^10.12.3",
  "js-cookie": "^3.0.5",
  "monaco-editor": "^0.44.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.52.1",
  "react-icons": "^5.2.1",
  "react-monaco-editor": "^0.55.0",
  "react-redux": "^9.1.2",
  "react-router-dom": "^6.24.1",
  "redux-persist": "^6.0.0",
  "socket.io-client": "^4.7.5",
  "styled-components": "^6.1.11",
  "uuid": "^10.0.0",
  "zod": "^3.23.8"
}
\`\`\`

### DevDependencies

\`\`\`json
{
  "@babel/core": "^7.24.9",
  "@babel/preset-env": "^7.24.8",
  "@babel/preset-react": "^7.24.7",
  "@types/js-cookie": "^3.0.6",
  "@types/react-dom": "^18.3.0",
  "@typescript-eslint/eslint-plugin": "^7.13.1",
  "@typescript-eslint/parser": "^7.13.1",
  "@vitejs/plugin-react": "^4.3.1",
  "eslint": "^8.57.0",
  "eslint-plugin-react-hooks": "^4.6.2",
  "eslint-plugin-react-refresh": "^0.4.7",
  "typescript": "^5.2.2",
  "vite": "^5.3.1"
}
\`\`\`

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Redes Sociais

- LinkedIn: [Henrique Pinheiro](https://www.linkedin.com/in/henriquepinheiroxavier/)
- GitHub: [henriquepx](https://github.com/henriquepx)
- Email: [henriquepinheiroxavier@gmail.com](mailto:henriquepinheiroxavier@gmail.com)