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

router.post('/new-project', express.urlencoded({extended: true}), linkController.addNewPoject);

module.exports = router