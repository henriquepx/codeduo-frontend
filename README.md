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

CodeDuo is a collaborative code editing platform that allows users to create real-time coding rooms, share and edit code with others. The platform supports user authentication, personalized profiles, and integrates with Firebase for Google login.

## Features

- User authentication with Firebase (login via Google and email/password)
- Real-time coding rooms with Socket.io
- Code editor based on the Monaco Editor
- Custom avatar selection
- Data persistence with Redux and Redux Persist

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces. [Documentation](https://reactjs.org/docs/getting-started.html)
- **TypeScript**: A superset of JavaScript that adds static typing to the code. [Documentation](https://www.typescriptlang.org/docs/)
- **styled-components**: Library for styling with CSS-in-JS. [Documentation](https://styled-components.com/docs)
- **Redux**: Global state management for the application. [Documentation](https://redux.js.org/introduction/getting-started)
- **Redux Persist**: Persistence of Redux state across sessions. [Documentation](https://github.com/rt2zz/redux-persist)
- **React Router**: Dynamic routing in React applications. [Documentation](https://reactrouter.com/docs/en/v6)
- **React Hook Form**: Library for handling forms in React. [Documentation](https://react-hook-form.com/get-started)
- **axios**: HTTP client for making API requests. [Documentation](https://axios-http.com/docs/intro)
- **Socket.io-client**: Library for real-time communication via WebSockets. [Documentation](https://socket.io/docs/v4/client-api/)
- **monaco-editor**: Code editor used in Visual Studio Code, embedded in the web application. [Documentation](https://microsoft.github.io/monaco-editor/)
- **react-monaco-editor**: React component for the Monaco Editor. [Documentation](https://github.com/react-monaco-editor/react-monaco-editor)
- **js-cookie**: Library for handling cookies. [Documentation](https://github.com/js-cookie/js-cookie)
- **zod**: Library for schema and type validation in TypeScript. [Documentation](https://zod.dev/)

### Backend

- **Express**: Web framework for Node.js. [Documentation](https://expressjs.com/)
- **MongoDB**: NoSQL database for data storage. [Documentation](https://www.mongodb.com/docs/manual/)
- **Mongoose**: Library for data modeling in MongoDB. [Documentation](https://mongoosejs.com/docs/)
- **jsonwebtoken**: Library for creating and verifying JWT tokens. [Documentation](https://github.com/auth0/node-jsonwebtoken)
- **bcrypt**: Library for hashing passwords. [Documentation](https://www.npmjs.com/package/bcrypt)

### Development Tools

- **Vite**: Fast build tool for front-end projects. [Documentation](https://vitejs.dev/guide/)
- **ESLint**: Linter for identifying and fixing issues in JavaScript/TypeScript code. [Documentation](https://eslint.org/docs/user-guide/getting-started)
- **Prettier**: Code formatter. [Documentation](https://prettier.io/docs/en/)
- **TypeScript ESLint**: ESLint rules for TypeScript. [Documentation](https://typescript-eslint.io/)

## Project Structure

The project structure is organized as follows:

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

## Available Scripts

In the project directory, you can run:

### \`npm run dev\`

Runs the application in development mode. Open http://localhost:3000 to view it in the browser.

### \`npm run build\`

Creates the production build in the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### \`npm run lint\`

Runs the linter to check for potential code errors and ensure compliance with defined rules.

### \`npm run preview\`

Runs a preview of the production build.

## Dependencies

Here are the project dependencies and devDependencies:

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Social Media

- LinkedIn: [Henrique Pinheiro](https://www.linkedin.com/in/henriquepinheiroxavier/)
- GitHub: [henriquepx](https://github.com/henriquepx)
- Email: [henriquepinheiroxavier@gmail.com](mailto:henriquepinheiroxavier@gmail.com)