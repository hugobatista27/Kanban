const mongoose = require('mongoose');

const kanbanSchema = new mongoose.Schema({
    projectName: {type: String, required: true},
    description: {type: String},
    colluns: {type: Array},
    tasks: {type: Array}
})

module.exports = mongoose.model('Kanban', kanbanSchema)
