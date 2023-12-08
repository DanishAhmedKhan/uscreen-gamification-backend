const express = require('express');
const tryCatch = require('../helpers/tryCatch.js');
const auth = require('../middlewares/userAuth.js');
const userValidator = require('../validators/user.validator.js');
const userController = require('../controllers/user.controller.js');

const router = express.Router();

router.post('/addUser', userValidator.addUser, tryCatch(userController.addUser));
router.post('/addData', auth, userValidator.addData, tryCatch(userController.addData));
router.post('/getData', auth, tryCatch(userController.getData));
router.post('/getLeaderboard', auth, tryCatch(userController.getLeaderboard));

module.exports = router;