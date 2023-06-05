const express = require('express');
const router = express.Router();
const app = express();
const linkController = require('../mongo/querys/crudDB.js');

app.use(express.json)

router.post('/allProjects', express.urlencoded({extended: true}), linkController.getAllData);

router.post('/projectsName', express.urlencoded({extended: true}), linkController.getProjectNameAndId)

router.post('/project/:id', express.urlencoded({extended: true}), linkController.getProjectById);

router.put('/project/change-title', express.urlencoded({extended: true}), linkController.updateTitle);

router.put('/project/change-task', express.urlencoded({extended: true}), linkController.updateTasks);

router.post('/new-project', express.urlencoded({extended: true}), linkController.addNewProject);

router.put('/project/new-task', express.urlencoded({extended: true}), linkController.addNewTask)

router.delete('/delete/:id', linkController.deleteById);

router.delete('/delete/task/:id', express.urlencoded({extended: true}), linkController.deleteTask)

module.exports = router