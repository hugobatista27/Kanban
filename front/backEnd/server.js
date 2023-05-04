const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const linkRoute = require('./routes/linkRoutes.js')
const port = 3001;


mongoose.connect('mongodb://localhost:27017/kanban', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})

let db = mongoose.connection;

db.on('error',() => {console.log("Houve um Erro")});
db.once('open', () => {console.log("Banco carregado")});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', linkRoute)

app.listen(port, () => console.log('App listen on port ', port))