const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const linkRoute = require('./routes/linkRoutes.js')
const port = 3001;

const teste = require('./mongo/querys/crudDB.js')

mongoose.connect('mongodb://localhost:27017/kanban', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})

let db = mongoose.connection;

db.on('error',() => {console.log("Houve um Erro")});
db.once('open', () => {console.log("Banco carregado")});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', linkRoute)

app.listen(port, () => console.log('App listen on port ', port))

const kanbanSchema = {
    projectName: 'Segundo Teste',
    description: 'Fazendo o segundo teste com o Mongo',
    colluns: [{nomeColuna: 'todo'}, {nomeColuna: 'doing'}],
    tasks: [{taskname: 'Subtask1', done: false}, {taskname: 'Subtask2', done: false}]
}

//teste.novoDado(kanbanSchema)
//teste.getAllData().then((retorno) => console.log(retorno));
//teste.getProjectNameAndId().then((retorno) => console.log(retorno[0].id));
//teste.updateTitle()