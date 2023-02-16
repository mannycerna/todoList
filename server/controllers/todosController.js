const Todo = require('../models/Todos');

async function createOneTodo(req, res, next) {

    try {
      //parse out fields from POST request
      
      const taskName = req.body.taskName
      const description = req.body.description
      const completed = req.body.completed
      const dateCreated = req.body.dateCreated
      const dateCompleted = req.body.dateCompleted
      const status = req.body.status
      const priority = req.body.priority
      
      /*pass fields to new Blog model notice how mongoose allows for clear organization and type checking of fields automatically based on schema (models/Blogs.js)*/
      const newTodo = new Todo({
        taskName,
        description,
        completed,
        dateCreated,
        dateCompleted,
        status,
        priority,
      });
  
      //save our new entry to the database
      const savedData = await newTodo.save();
      
      //return the request to the user
      res.json({
        success: true,
        todos: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  };
module.exports = {
    createOneTodo,

};