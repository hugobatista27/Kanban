const Schema = require('../models/Kanban.js');
const mongoose = require('mongoose');
const DB = mongoose.connection.useDb('kanban');
const Model = (userProject) => {
    return DB.model(userProject, Schema);
}

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

async function firstProjectToNewUsers(collectionName) {
    let Kanban = Model(collectionName, Schema)
    let project = new Kanban(modelNewProject('New Project'))
    try {
        let doc = await project.save();
        return doc
    } catch (error) {
        return error;
    }
}

const CRUD = {
    addNewProject: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName, Schema)
        let project = new Kanban(modelNewProject(req.body.name))
        try {
            let doc = await project.save();
            res.send(doc);
        } catch (error) {
            res.send(error)
        }
    },

    addNewTask: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName)
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
        let Kanban = Model(req.body.userCollectionName)

        try {
            let itens = await Kanban(req.body.kanban).find();
            res.send(itens)
        } catch (error) {
            res.send(error)
        } 
    },

    getProjectNameAndId: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName, Schema)

        try {
            let itens = await Kanban.find({}, {projectName: 1, id: 1})
            res.send(itens)
            
        } catch (error) {
            console.log(error)
        }
    },

    getProjectById: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName)
        
        try {
            let item = await Kanban.findById(req.params.id)
            res.send(item)
        } catch(erro) {
            console.log(erro);
        }
    },

    updateTasks: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName)

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
        let Kanban = Model(req.body.userCollectionName)

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
        let Kanban = Model(req.body.userCollectionName)

        try {
            let iten = await Kanban.findByIdAndDelete(req.params.id)
            res.send('item excluído')
        } catch (error) {
            console.log(error);
        }
    },

    deleteTask: async(req, res) => {
        let Kanban = Model(req.body.userCollectionName)

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