const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.get('/', userController.get);

router.get('/:userId', userController.getUser);

router.post('/', userController.post);

router.put('/:userId', userController.put);

router.delete('/', userController.delete);

module.exports = router;