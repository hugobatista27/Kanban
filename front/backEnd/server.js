const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

const teste = require('./mongo/querys/teste.js')

mongoose.connect('mongodb://localhost:27017/kanban', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})

let db = mongoose.connection;

db.on('error',() => {console.log("Houve um Erro")});
db.once('open', () => {console.log("Banco carregado")});

app.listen(port, () => console.log('App listen on port ', port))

const kanbanSchema = {
    projectName: 'Primerio Teste',
    description: 'Fazendo o primeiro teste com o Mongo',
    colluns: [{nomeColuna: 'todo'}, {nomeColuna: 'doing'}],
    tasks: [{taskname: 'Subtask1', done: false}, {taskname: 'Subtask2', done: false}]
}

//teste.novoDado(kanbanSchema)
teste.getAllData().then((retorno) => console.log(retorno))