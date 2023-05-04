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

const getProjectNameAndId = async() => {
    let itens = await Kanban.find({}, {projectName: 1, id: 1})
    return itens
}

const getProjectById = async(req, res) => {
    try {
        let item = await Kanban.findById(req.params.id)
        res.send(item)
    } catch(erro) {
        console.log(erro);
    }
}

const updateTasks = async(req, res) => {
    try {
        let task = await Kanban.findByIdAndUpdate(req.body.id, req.body.newTask)
        res.send('salvo')
    } catch (error) {
        console.log(error)
    }

}


async function updateTitle(req, res) {
    try {
        const newTitle = req.body.projectName;
        const id = req.body._id;

        const updatedItem = await Kanban.findOneAndUpdate({_id: id}, {projectName: newTitle}, {new: true});
        if (!updatedItem) {
            return res.status(404).send('Item não encontrado');
        }
        res.send('Atualizado com sucesso!');
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao atualizar item');
    }
}


module.exports = {novoDado, getAllData, getProjectNameAndId, updateTitle, addNewPoject, getProjectById, updateTitle};

