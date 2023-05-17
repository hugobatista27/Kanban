const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    statusName: {type: String},
    idCollun: {type: Number}
})

const subtaskSchema = new mongoose.Schema({
    idSubtask: {type: Number},
    description: {type: String},
    done: {type: Boolean}
})

const tasksSchema = new mongoose.Schema({
    taskName: {type: String},
    description: {type: String},
    /* status: {type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE']}, */
    idStatus: {type: Number},
    subtasks: [subtaskSchema]
})


const kanbanSchema = new mongoose.Schema({
    projectName: {type: String},
    description: {type: String},
    status: [statusSchema],
    tasks: [tasksSchema]
})

module.exports = mongoose.model('Kanban', kanbanSchema)

const exemplo = {
    projectName: {type: String},
    description: {type: String},
    status: [{
        statusName: {type: String},
        idCollun: {type: Number}
    }],
    tasks: [{
        _id: {default: mongoose.Types.ObjectId},
        taskName: {type: String},
        description: {type: String},
        /* status: {type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE']}, */
        idStatus: {type: Number},
        subtasks: [{
            idSubtask: {type: Number},
            description: {type: String},
            done: {type: Boolean}
        }]
    }]
}

const exemplo2 = {
    projectName: 'Kanban',
    description: "Criar uma aplicação para organizar um Kanban",
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
    tasks: [{
        _id: {default: mongoose.Types.ObjectId},
        taskName: "Criar o FrontEnd",
        description: "Desenvolver o front da aplicação, incluindo responsividade e ações",
        /* status: "TODO", */
        idStatus: 1,
        subtasks: [
            {
                idSubtask: 1,
                description: "Criar o HTML",
                done: true
            },
            {
                idSubtask: 2,
                description: "Estilizar com css",
                done: true
            },
            {
                idSubtask: 3,
                description: "Adicionar funcionalidade aos botões",
                done: true
            },
            {
                idSubtask: 4,
                description: "Experimentar o React",
                done: false
            }
        ]
    }, 
    {
        _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
        taskName: "Criar o BackEnd",
        description: "Desenvolver o lado do servidor, criar rotar e CRUD no banco de dados",
        status: "DOING",
        idStatus: 2,
        subtasks: [
            {
                idSubtask: 1,
                description: "Criar o Banco de dados",
                done: true
            },
            {
                idSubtask: 2,
                description: "Criar as rotas com express",
                done: true
            },
            {
                idSubtask: 3,
                description: "Não enlouquecer",
                done: false
            },
            {
                idSubtask: 4,
                description: "Não sei",
                done: false
            }
        ]
    },
    {
        _id: {type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId},
        taskName: "Teste",
        description: "Teste",
        status: "DONE",
        idStatus: 3,
        subtasks: [
            {
                idSubtask: 1,
                description: "Criar o Banco de dados",
                done: true
            }
        ]
    }]
}