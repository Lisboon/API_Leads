# MeusLeads - Desafio FullStack Studiomega

## 🌍 API Online
[![Deploy no Heroku](https://www.herokucdn.com/deploy/button.svg)](https://desafiostudiomega-2d925d8d0b86.herokuapp.com/)

**Documentação Swagger:** [https://desafiostudiomega-2d925d8d0b86.herokuapp.com/api](https://desafiostudiomega-2d925d8d0b86.herokuapp.com/api)

### Pré-requisitos
- Node.js 18+
- npm 9+
- PostgreSQL 15+
- Git

### Instalação
```bash
git clone https://github.com/seu-usuario/studiomega-desafio-fullstack-seu-nome
cd studiomega-desafio-fullstack-seu-nome
npm install
cp .env.example .env
```
# Configure suas variáveis no .env
```bash
npx prisma migrate dev
npm start dev
```

### Tecnologias Utilizadas
<div align="left">
  <!-- NestJS -->
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  </a>
  
  <!-- Prisma -->
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma">
  </a>
  
  <!-- JWT -->
  <a href="https://jwt.io/" target="_blank">
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT">
  </a>
  
  <!-- PostgreSQL -->
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  </a>
  
  <!-- Bcrypt -->
  <a href="https://www.npmjs.com/package/bcrypt" target="_blank">
    <img src="https://img.shields.io/badge/Bcrypt-525252?style=for-the-badge&logo=bcrypt&logoColor=white" alt="Bcrypt">
  </a>
</div>

### Testando a API
Exemplo com cURL:
1. Registrar usuário
```curl -X POST https://desafiostudiomega-2d925d8d0b86.herokuapp.com/v1/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Fulano","email":"fulano@exemplo.com","password":"senha123"}'
```
