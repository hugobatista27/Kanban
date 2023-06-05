const mongoose = require('mongoose');

const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const linkRoute = require('./routes/linkRoutes.js')
const port = 3001;
const MONGO_CONNECTION_STRING = 'mongodb+srv://hugobatista:wivQSwZhU6SWQocg@cluster0.rnh7b3r.mongodb.net/'


mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})

let DB = mongoose.connection.useDb('kanban');

DB.on('error',() => {console.log("Houve um Erro")});
DB.once('open', () => {console.log("Banco carregado")});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', linkRoute)

app.listen(port, () => console.log('App listen on port ', port))