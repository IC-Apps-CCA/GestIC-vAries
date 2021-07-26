# GestIC APP
GestIC is an application developed by the students of Universidade Federal de Alagoas (UFAL) during Project Management course. In this repository you can find the back-end portion of the application. It was developed in [Node.js](https://nodejs.org/) and the database was implemented with [PostgreSQL](https://www.postgresql.org/).

### Configuration
To run the application you will need to have installed [Node.js](https://nodejs.org/en/download/) v12+ and [PostgreSQL](https://www.postgresql.org/download/) v10+ with PgAdmin.
Once you have those installed you need to set the .env file. You can base on the .env.example file.

First step: Configure the database using the SQL files under docs/create in the repository.

Next, in the root of the repository, you need to run
```ssh
npm install
```

### Run the application
To run the server
```ssh
npm start
```

### API documentation
To see the documentation of the API go to [/api-docs](https://api.gestic.mateusbmp.com.br/api-docs/) endpoint once the server is up.