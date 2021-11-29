const express = require('express');
const { handleCustomError, handlePSQLErrors, handleStatus500 } = require('./controllers/error.controllers');
const apiRouter = require("./routers/api.routers");


const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomError);
app.use(handlePSQLErrors);
app.use(handleStatus500);

module.exports = app;