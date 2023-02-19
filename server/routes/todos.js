const {v4: uuidv4} = require("uuid");
var express = require("express");
var router = express.Router();
const todosController = require('../controllers/todosController');


router.post("/create-one", todosController.createOneTodo);
router.post("/createManyTodo", todosController.createManyTodo);
router.get("/all", todosController.getAllTodos);
router.get("/singleTodo/:taskName", todosController.getSingleTodo);
router.get("/singleTodoById/:id", todosController.singleTodoById);
router.put("/updateSingleTodo/:id", todosController.updateSingleTodo);
router.delete("/deleteSingleTodo/:id", todosController.deleteSingleTodo);
router.put("/updateManyTodo/:completed", todosController.updateManyTodo);
router.delete("/deleteManyTodo/", todosController.deleteManyTodo);


module.exports = router;
