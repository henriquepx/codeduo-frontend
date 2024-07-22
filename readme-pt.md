<table align="right">
  <tr>
    <td>
      <a href="readme-pt.md">🇧🇷 Português</a>
    </td>
  </tr>
  <tr>
    <td>
      <a href="README.md">🇺🇸 English</a>
    </td>
  </tr>
</table>

<br>

# CodeDuo Front-end

## Índice

1. [Descrição do Projeto](#descrição-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Instalação e Execução](#instalação-e-execução)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Contribuição](#contribuição)
7. [Licença](#licença)
8. [Contato](#contato)

## Descrição do Projeto

O **CodeDuo** é uma plataforma de edição de código em tempo real, projetada para facilitar a colaboração entre desenvolvedores. Com uma interface intuitiva e recursos poderosos, o CodeDuo permite que múltiplos usuários editem, compartilhem e gerenciem projetos de código simultaneamente.

## Funcionalidades

- **Edição de Código em Tempo Real**: Permite que múltiplos usuários editem o mesmo arquivo simultaneamente.
- **Autenticação de Usuários**: Login seguro com OAuth.
- **Perfis de Usuários**: Cada usuário pode personalizar seu perfil com uma foto.
- **Gerenciamento de Salas**: Criação e gerenciamento de salas de edição de código.
- **Configurações de Editor**: Personalização do tema, formatação e destaque de sintaxe.
- **Compartilhamento de Projetos**: Possibilidade de compartilhar projetos com outros usuários.
- **Integração com Git**: Funcionalidades de controle de versão integradas.
- **Notificações em Tempo Real**: Notificações sobre mudanças e eventos importantes nas salas.

## Tecnologias Utilizadas

- **Frontend**: React, TypeScript, styled-components
- **State Management**: Redux
- **Real-time Communication**: WebSockets
- **Build Tool**: Vite
- **Testing**: Vitest

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/codeduo-frontend.git
cd codeduo-frontend
```

### Instalando as Dependências

```bash
npm install
# ou
yarn install
```

### Executando o Projeto

```bash
npm run dev
# ou
yarn dev
```

### Executando os Testes

```bash
npm run test
# ou
yarn test
```

## Estrutura do Projeto

```plaintext
src/
├── assets/
├── components/
│   ├── dropdown/
│   ├── form/
│   ├── formregister/
│   ├── logo/
│   ├── oauth/
├── pages/
│   ├── home/
│   ├── login/
│   ├── register/
│   ├── room/
├── redux/
├── routes/
```

## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Faça suas modificações e comite (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Henrique - [email@example.com](mailto:email@example.com)

LinkedIn: [linkedin.com/in/henrique](https://linkedin.com/in/henrique)
