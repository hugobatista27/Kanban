const User = require('../models/User.js');

const crudUser = {
    addNewUser: async (req, res) => {
        let newUser = new User(req.body)
        try {
            let doc = await newUser.save();
            res.send(doc);
        } catch (error) {
            res.send(error)
        }
    },

    getProject: async(req, res) => {
        let user = await User.findOne({
            'login.email': req.body.email,
            'login.password': req.body.password
        });
        if(!user) {
            res.send({message: 'notFind'})
        } else {
            res.send({...user, message: 'find'})
        }
    },

    validateUser: async(req, res) => {
        if (req.body.userName) {
            let userName = await User.findOne({
                'userName': req.body.userName
            })
            userName ? res.send({find: true}) : res.send({find: false})
            
        } else if(req.body.email){
            let email = await User.findOne({
                'login.email': req.body.email,
            })
            email ? res.send({find: true}) : res.send({find: false})
            
        } else {
            res.send({message: "O corpo da requisição está vazio"})
        }
    }
}

module.exports = crudUser;