const Kanban = require('../models/Kanban.js')

const kanbanSchema = {
    projectName: 'Primerio Teste',
    description: 'Fazendo o primeiro teste com o Mongo',
    colluns: [{nomeColuna: 'todo'}, {nomeColuna: 'doing'}],
    tasks: [{taskname: 'Subtask1', done: false}, {taskname: 'Subtask2', done: false}]
}

async function novoDado(dado) {
    let kanban = new Kanban(dado)
    try {
        let save = await kanban.save()
        console.log('Salvo com sucesso');
    } catch (error) {
        console.log('Deu ruim')
    }
}

const addNewPoject = async(req, res) => {
    let project = new Kanban(req.body)
    try {
        let doc = await project.save();
        res.send('Projeto salvo');
    } catch (error) {
        res.send(error)
    }
}

const getAllData = async(req, res) => {
    try {
        let itens = await Kanban.find();
        res.send(itens)
    } catch (error) {
        res.send(error)
    } 
}

const getProjectNameAndId = async(req, res) => {
    try {
        let itens = await Kanban.find({}, {projectName: 1, id: 1})
        res.send(itens)
    } catch (error) {
        res.send(error);
    }
}

async function updateTitle() {
    try {
        let itens = await Kanban.findOneAndUpdate({_id: '644c0bf48c142252e68ebca6'}, {projectName: 'Troquei a key do ID'})
        console.log(itens)
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {novoDado, getAllData, getProjectNameAndId, updateTitle, addNewPoject};

