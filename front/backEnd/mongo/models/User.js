const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String}
})

const userSchema = new mongoose.Schema({
    userName: {type: String},
    login: loginSchema
})

let DB = mongoose.connection.useDb('kanban');

module.exports = DB.model('user', userSchema);

const exUsers = {
    _id: 'auto',
    userName: 'jhol',
    login: {
        email: 'jhol@gmail.com',
        password: '******'
    }
}