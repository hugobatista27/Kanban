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

//let DB = mongoose.connection.useDb('kanban');

//module.exports = DB.model('kanban', kanbanSchema);
module.exports = kanbanSchema;