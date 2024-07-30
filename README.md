# ClickBeard

ClickBeard é uma aplicação de agendamento para uma barbearia, desenvolvida com um backend utilizando Node.js com NestJS, PostgreSQL como banco de dados e um frontend utilizando React.js, Next.js e Tailwind CSS. O sistema permite aos usuários agendar serviços de barbearia, enquanto os barbeiros podem gerenciar seus agendamentos.

## Estrutura do Projeto

- **Desenvolvido com**: Node.js, NestJS, React, NextJS e Tailwind.
- **Banco de Dados**: PostgreSQL.
- **Migrações**: Utiliza TypeORM para migrações de dados.
- **Autenticação**: Módulo de autenticação com proteção de rotas.
- **Gerenciamento de Usuários**: Módulo para gerenciamento de usuários (clientes e administradores).
- **Gerenciamento de Barbeiros**: Módulo para gerenciamento de barbeiros.
- **Agendamentos**: Módulo para criação, visualização e gerenciamento de agendamentos.

## Funcionalidades

### Usuários
- Cadastro de usuários.
- Login de usuários.
- Agendamento de serviços.

### Barbeiros
- Cadastro de barbeiros.
- Gerenciamento de agendamentos.

### Agendamentos
- Criação de agendamentos.
- Visualização e confirmação de agendamentos.

## Configuração do Projeto

### Pré-requisitos

- Docker
- Docker Compose

### Passo a Passo

1. **Clone o repositório**

   ```sh
   git clone git@github.com:Michelprj/ClickBeard_Michel_Pereira.git
   cd ClickBeard_Michel_Pereira
2. **Suba os containers do Docker**

   ```sh
   docker compose up --build
- Isso iniciará o backend e o frontend da aplicação, além de configurar o banco de dados PostgreSQL.
3. **Acesse a aplicação**
  - Frontend: http://localhost:3000
  - Backend: http://localhost:3003


## Estrutura de Pastas

### Backend
- **src/** 
  - **database/**<br />
    - **migrations**: Migrações do banco de dados.<br />
  - **libs/**<br />
    - **common**: Configuração de atenticação.<br />
    - **errors**: Erro personalizado.<br />
    - **interceptors**: Erro interceptor.<br />
  - **modules/**<br />
    - **auth**: Módulo de autenticação.<br />
    - **user**: Módulo de usuários.<br />
    - **barber**: Módulo de barbeiros.<br />
    - **booking**: Módulo de agendamentos.<br />

### Frontend
- **src/** 
  - **app/**: Todas as telas de acesso a rotas.
  - **components/**: Componentes utilizados.
  - **context/**: Gerenciamento de estado global.
  - **infrastructure/**: Configurações da api e chamadas para os endpoints.
  - **mocks/**: Dados fixos mockados para uso na aplicação.
  - **router/**: Rotas protegidas.
  - **schemas/**: Configuração e validação para formulários com Zod.
  
## Comandos Úteis

- Build e iniciar os containers Docker
   ```sh
   docker compose up --build
- Parar os containers Docker
   ```sh
   docker compose down

