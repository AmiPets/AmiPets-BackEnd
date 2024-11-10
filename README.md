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

- Node.js: Ambiente de execução para JavaScript no lado do servidor.
- Express.js: Framework para construção de APIs RESTful.
- Prisma: ORM (Object-Relational Mapping) para facilitar a interação com o banco de dados.
- PostgreSQL: Banco de dados relacional utilizado para armazenar informações dos pets, adotantes e adoções.
- JavaScript: Linguagem principal para desenvolvimento do back-end.
- Prisma Client: Utilizado para realizar a comunicação com o banco de dados PostgreSQL.


## Autores

 [Ramon Godinho](https://github.com/Ramonlegend), 
 [Hebert Soares](https://github.com/HebertFSoares), 
 [Rodrigo Dorneles](https://github.com/roddorneles),
 [Gabriel Baptista](https://github.com/bapGabriel) e
 [Guilherme Bessa](https://github.com/Guiezz). 

## Como Rodar o Projeto
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
    npm start
```
O servidor estará rodando em http://localhost:3000.


6. Testar a API
Utilize ferramentas como Postman ou Insomnia para fazer requisições HTTP e testar as funcionalidades da API, como cadastrar pets, adotar um pet e buscar pets.

## Estrutura do Projeto
O projeto está estruturado da seguinte forma:

    /amipets
        /controllers         # Controladores que gerenciam as rotas e lógica de negócio
        /entities            # Definições de entidades (Ex: Pet, Adoção)
        /utils               # Funções utilitárias (Ex: Validações, formatação de datas)
        /database            # Conexão e configuração do Prisma Client
        /routes              # Definição das rotas da API
        /migrations          # Migrations do Prisma
        .env                 # Arquivo de configuração de variáveis de ambiente
        package.json         # Dependências e scripts do projeto
```
## Conclusão
Este projeto oferece uma solução prática para a adoção de animais, com um backend robusto e uma API fácil de usar. 


feito com ❤️ para Avanti Atlantico Bootcamp 2s2024 😊
