require('dotenv/config');

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load(path.resolve(
    __dirname, 'config/swagger.yaml'));

const routes = require('./routes/index');

const verifyJWT = require('./config/configJWT');

var corsOptions = {
    origin: process.env.CLIENT_HOST,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(express.json());
app.use('/access', routes.access);
app.use('/user', routes.user);
app.use('/project', routes.project);
app.use('/offer', routes.offer);
app.use('/informative', routes.informative);
app.use('/research', routes.research);
app.use('/event', routes.event);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', verifyJWT, (req, res) => {
    res.send("Bem vindo a versão V0.0 do backend da aplicação GestIC!");
});

module.exports = app;
