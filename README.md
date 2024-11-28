# AmiPets

O Amipets é uma plataforma de adoção de animais de estimação que conecta adotantes e pets, oferecendo uma maneira simples e eficiente de adotar animais. O projeto permite que os usuários cadastrem, busquem e adotem pets, além de gerenciar o processo de adoção com funcionalidades como a atualização do status do pet.

## 🚀 Objetivos

O objetivo principal do Amipets é facilitar o processo de adoção de animais, oferecendo uma interface simples para:

- Cadastrar novos pets para adoção.
- Visualizar informações detalhadas sobre cada pet.
- Buscar pets filtrando por características como espécie, tamanho, e personalidade.
- Realizar adoções e atualizar o status do pet para "adotado".

## 💻 Funcionalidades
- Cadastro de Pet: Permite a criação de novos cadastros de pets com informações como nome, espécie, idade, tamanho, descrição e foto.
- Busca de Pets: Filtragem de pets por parâmetros como espécie, tamanho, status, e personalidade.
- Adoção de Pet: Usuários podem adotar pets disponíveis e o status do pet será automaticamente alterado para "adotado".
- Visualização de Pet: Consulta detalhada das informações de um pet.
- Gerenciamento de Adoções: Os adotantes podem visualizar as adoções realizadas.

## ⚙️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução de JavaScript no lado do servidor, permitindo a criação de aplicações escaláveis.
- **Express.js**: Framework minimalista para construção de APIs RESTful, facilitando o desenvolvimento de rotas e controle de requisições.
- **Prisma**: ORM (Object-Relational Mapping) que simplifica a comunicação com o banco de dados e permite a utilização de uma linguagem declarativa para modelar os dados.
- **PostgreSQL**: Banco de dados relacional robusto e escalável, utilizado para armazenamento seguro e eficiente das informações sobre pets, adotantes e adoções.
- **JavaScript**: Linguagem de programação principal, utilizada no desenvolvimento do back-end.
- **Prisma Client**: Ferramenta do Prisma para realizar operações com o banco de dados PostgreSQL, garantindo uma integração eficiente e otimizada entre o servidor e os dados.
- **AWS**: Plataforma de computação em nuvem usada para hospedar e gerenciar a infraestrutura do projeto, com serviços que incluem armazenamento, banco de dados e escalabilidade.
- **Nginx**: Servidor web e proxy reverso que gerencia o tráfego de rede, melhora o desempenho e aumenta a segurança das aplicações.
- **Nodemailer**: Biblioteca para o envio de e-mails, utilizada para envio de notificações e comunicação com usuários.
- **OTP (One-Time Password)**: Implementação de senhas temporárias para autenticação e verificação de usuários, garantindo segurança adicional.
- **Swagger**: Ferramenta para documentação e teste das APIs, permitindo que desenvolvedores e consumidores das APIs interajam com os endpoints de forma visual e acessível.
- **JWT (JSON Web Token)**: Método de autenticação para proteger as rotas do projeto, permitindo o gerenciamento seguro de sessões e autenticação de usuários.
- **bcryptjs**: Biblioteca para hash de senhas, adicionando uma camada de segurança ao armazenamento de credenciais dos usuários.
- **Docker**: Plataforma de contêineres utilizada para criar, implantar e rodar o aplicativo em ambientes isolados e consistentes, facilitando a escalabilidade e a manutenção.

## 🏁 Como Rodar o Projeto
Para rodar este projeto em sua máquina local, siga os passos abaixo:

1. Clone o repositório 
```
    git clone https://github.com/AmiPets/AmiPets-BackEnd.git
```

2. Instale as dependências
 ```
    cd amipets
    npm install
```
3. Configuração do Banco de Dados

- Instalar o PostgreSQL: Certifique-se de que o PostgreSQL está instalado em sua máquina.
- Criar o banco de dados: Crie um banco de dados no PostgreSQL.
- Configurar o arquivo .env: Crie um arquivo .env na raiz do projeto com as credenciais de acesso ao banco de dados:

```
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/amipets"
```

4. Rodar as Migrações Prisma
```
    npx prisma migrate dev
```

5. Iniciar o Servidor
```
    npm run dev
```
O servidor estará rodando em http://localhost:3000.


6. Testar a API
Utilize ferramentas como Postman ou Insomnia para fazer requisições HTTP e testar as funcionalidades da API, como cadastrar pets, adotar um pet e buscar pets.

## 🐳 Executando o Projeto com Docker

Este guia vai ajudá-lo a rodar o projeto **AmiPets** utilizando Docker. Abaixo estão os passos necessários para configurar o ambiente, rodar os contêineres, executar migrações do banco de dados e acessar os logs.

1. Configurando Variáveis de Ambiente

Certifique-se de que o arquivo `.env` esteja configurado corretamente para se conectar ao banco de dados PostgreSQL que será executado no Docker. O conteúdo do arquivo `.env` deve ser:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/amipets"
JWT_SECRET=SECRET
EMAIL_USER=example@gmail.com 
EMAIL_PASS=passexemple
```

2. Iniciando os Contêineres

Para construir e iniciar os contêineres definidos no `docker-compose.yml`, execute o seguinte comando:

```
docker-compose up --build
```

## 📝 Documentação da API

A documentação da API pode ser acessada através do Swagger. Dependendo de onde o servidor está sendo executado, você pode acessar a documentação de uma das seguintes maneiras:

Local (Desenvolvimento)
Se você está rodando o servidor localmente, acesse a documentação no seguinte endereço:
```
http://localhost:3000/api-docs
```

Produção (Deploy)
Se o projeto está em produção, você pode acessar a documentação através do link abaixo:
```
https://amipets.myddns.me/api-docs/#/
```

Credenciais de Acesso ao Swagger
Para acessar a documentação da API no Swagger, utilize as seguintes credenciais de login:

 Usuário: ```ADMIN```
 Senha: ```admin```


## 📂 Estrutura do Projeto
O projeto está estruturado da seguinte forma:

    /amipets
        /controllers         # Controladores que gerenciam as rotas e lógica de negócio
        /database            # Conexão e configuração do Prisma Client
        /entities            # Definições de entidades (Ex: Pet, Adoção)
        /middlewares         # Funções intermediárias para processamento de requisições (Ex: autenticação, validações)
        /routes              # Definição das rotas da API
        /services            # Lógica de serviços de negócio (Ex: manipulação de dados, envio de notificações)
        /migrations          # Migrations do Prisma
        /utils               # Funções utilitárias (Ex: Validações, formatação de datas)
        index.js             # Arquivo principal de inicialização do servidor
        .env                 # Arquivo de configuração de variáveis de ambiente
        package.json         # Dependências e scripts do projeto

## ✍️ Autores

| <img src="https://avatars.githubusercontent.com/u/88061348?s=400&u=0f256aaecccd77a0d09b4b04b6a7f42e95729fbd&v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/122309444?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/128107879?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/11697564?v=4" width="100">  | <img src="https://avatars.githubusercontent.com/u/49773194?v=4" width="100">  |
| --------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [HebertFSoares](https://github.com/HebertFSoares)                | [Ramon Godinho](https://github.com/Ramonlegend)                  | [Guilherme Bessa](https://github.com/Guiezz)                    | [Rodrigo Dorneles](https://github.com/roddorneles)              | [Gabriel Baptista](https://github.com/bapGabriel)              |


## 😎 Conclusão
Este projeto oferece uma solução prática para a adoção de animais, com um backend robusto e uma API fácil de usar. 


feito com ❤️ para Avanti Atlantico Bootcamp 2s2024 😊
