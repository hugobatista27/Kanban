const express = require('express');
const router = express.Router();
const linkController = require('../mongo/querys/crudDB.js')

router.get('/', linkController.getAllData);

router.get('/projectsName', linkController.getProjectNameAndId);

router.post('/new-project', express.urlencoded({extended: true}), linkController.addNewPoject)

module.exports = router