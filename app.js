const express = require('express');
const { handleCustomError, handlePSQLErrors1, handleStatus500, handlePSQLErrors2 } = require('./controllers/error.controllers');
const apiRouter = require("./routers/api.routers");


const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
    res.status(400).send({msg : 'Path not found'})
});

app.use(handleCustomError);
app.use(handlePSQLErrors1);
app.use(handlePSQLErrors2);
app.use(handleStatus500);

module.exports = app;