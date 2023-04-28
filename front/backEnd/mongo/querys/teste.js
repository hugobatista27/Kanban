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

async function getAllData() {
    try {
        let itens = await Kanban.find();
        return itens
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {novoDado, getAllData};
// novoDado(kanbanSchema);
