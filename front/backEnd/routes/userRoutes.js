const express = require('express');
const router = express.Router();
const app = express();
const linkController = require('../mongo/querys/usersQuery.js');

app.use(express.json);

router.post('/register-user', linkController.addNewUser);
router.post('/get-project', linkController.getProject);
router.post('/validate-user', linkController.validateUser);

module.exports = router;