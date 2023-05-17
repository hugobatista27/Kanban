const express = require('express');
const router = express.Router();
const app = express();
const linkController = require('../mongo/querys/crudDB.js');

app.use(express.json)

router.get('/allProjects', linkController.getAllData);

router.get('/projectsName', (req, res) => {
    linkController.getProjectNameAndId()
        .then((data) => {
            res.setHeader('Content-Type', 'application/json'); 
            res.status(200).send(JSON.stringify(data));
        })
});

router.get('/project/:id', linkController.getProjectById);

router.put('/project/change-title', express.urlencoded({extended: true}), linkController.updateTitle);

router.put('/project/change-task', express.urlencoded({extended: true}), linkController.updateTasks);

router.post('/new-project', express.urlencoded({extended: true}), linkController.addNewProject);

router.put('/project/new-task', express.urlencoded({extended: true}), linkController.addNewTask)

router.delete('/delete/:id', linkController.deleteById);

module.exports = router