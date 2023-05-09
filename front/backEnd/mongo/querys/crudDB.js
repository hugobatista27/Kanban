const Kanban = require('../models/Kanban.js')

const kanbanSchema = {
    projectName: 'Primerio Teste',
    description: 'Fazendo o primeiro teste com o Mongo',
    colluns: [{nomeColuna: 'todo'}, {nomeColuna: 'doing'}],
    tasks: [{taskname: 'Subtask1', done: false}, {taskname: 'Subtask2', done: false}]
}

function modelNewProject(name) {
    const model = {
        projectName: name,
        description: "",
        status: [{
                statusName: "TODO",
                idCollun: 1
            }, {
                statusName: "DOING",
                idCollun: 2
            }, {
                statusName: "DONE",
                idCollun: 3
            }
        ],
        tasks: []
    }
    return model
}

const CRUD = {
    addNewProject: async(req, res) => {
        let project = new Kanban(modelNewProject(req.body.name))
        try {
            let doc = await project.save();
            res.send(doc);
        } catch (error) {
            res.send(error)
        }
    },

    getAllData: async(req, res) => {
        try {
            let itens = await Kanban.find();
            res.send(itens)
        } catch (error) {
            res.send(error)
        } 
    },

    getProjectNameAndId: async() => {
        let itens = await Kanban.find({}, {projectName: 1, id: 1})
        return itens
    },

    getProjectById: async(req, res) => {
        try {
            let item = await Kanban.findById(req.params.id)
            res.send(item)
        } catch(erro) {
            console.log(erro);
        }
    },

    updateTasks: async(req, res) => {
        try {
            const tasks = req.body.task
            const id = req.body._id

            const updatedTask = await Kanban.findOneAndUpdate({_id: id}, tasks, {new: true})
            if (!updatedTask) {
                return res.status(404).send('Item não encontrado');
            }
            res.send('Atualizado com sucesso!');
        } catch(error) {
            console.log(error)
        }
    },


    updateTitle: async(req, res) => {
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
    },

    deleteById: async(req, res) => {
        try {
            let iten = await Kanban.findByIdAndDelete(req.params.id)
            res.send('item ecluído')
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = CRUD

