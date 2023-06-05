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

    addNewTask: async(req, res) => {
        try {
            let project = await Kanban.findById(req.body.id)
            project.tasks.push(req.body.newTask)
            await project.save()
            res.send('salvo')
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
            const task = req.body.tasks
            const id = req.body._id
            const index = req.body.index

            const caminho = `tasks.${index}`
            const update = {}
            update[caminho] = task
            
            const updatedTask = await Kanban.updateOne({_id: id}, {$set: update})
            if (!updatedTask) {
                return res.status(404).send('Item não encontrado');
            }
            res.send(updatedTask);
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
            res.send('item excluído')
        } catch (error) {
            console.log(error);
        }
    },

    deleteTask: async(req, res) => {
        try {
            let project = await Kanban.findById(req.params.id)
            project.tasks = project.tasks.filter((task) => {
                if (task._id != req.body.taskId) {
                    return task
                }
            })
            await project.save()
            res.send('Deletado')
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = CRUD