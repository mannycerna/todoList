const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
const todosController = require('../controllers/todosController');

router.post("/create-one",  todosController.createOneTodo);

module.exports = router;