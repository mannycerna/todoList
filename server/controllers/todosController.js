const Todo = require('../models/Todos');
const { v4: uuidv4 } = require("uuid");
const { db, insertMany } = require('../models/Todos');
const { Model } = require('mongoose');


async function createOneTodo(req, res) {

    try {
      //parse out fields from POST request
    
      const taskName = req.body.taskName
      const description = req.body.description
      const completed = req.body.completed
    //   const dateCreated = req.body.dateCreated
    //   const dateCompleted = req.body.dateCompleted
      const status = req.body.status
      const priority = req.body.priority
      
      /*pass fields to new Blog model notice how mongoose allows for clear organization and type checking of fields automatically based on schema (models/Blogs.js)*/
      const newTodo = new Todo({
        uuid:uuidv4(),
        taskName,
        description,
        completed,
        // dateCreated,
        // dateCompleted,
        status,
        priority,
      });

  
      
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

async function createManyTodo(req, res) {
    try{
        const insertedTodo = db.collection('todo_items').insertMany(req.body.todos, function(err, todos){
            // if(err) console.log(err);
            // else console.log("todos Added Succesfully.");
            });

       res.json({
        success: true,
        insertedTodo:insertedTodo
        })

        } catch (error){
        console.log(error);
        }      
};

  async function getAllTodos(req, res, next) {

    try{
        const allTodos = await Todo.find({}).select('-__v')
        // res.json({todos: allTodos});
        res.json({
            success: true,
            allTodos: allTodos
        });
    } 
    catch (error) {
        console.log(error);        
    }
    

  };


  async function getSingleTodo(req, res) {
    let singleTodo;
    
    try { 
        singleTodo = await Todo.findOne({taskName: req.params.taskName});
    } catch (error) {
        console.log(error);        
    }
    res.json({
        success: true,
        oneTodo: singleTodo
    })
  }

  async function singleTodoById(req, res, next) {
    // checking if the parameter ID was passed in 
    if (!req.params.id) {
      res.json({
        success: false,
        message: "The blog id must be provided in the url parameters",
      });
      return;
    }
  
    console.log("first");
    // await blocks the execution until the promise resolves
    // aka. make sure line 47 finishes before we get on 
    // with the rest of our program 
    try{
    const todoTask = await Todo.findOne({
      uuid: req.params.id,
    }).catch ((error) => {
      console.log("something went wrong");
    });
    console.log("second");
    res.json({
      success: true,
      posts: todoTask,
    });
  } catch(e){
    console.log(e);
  }
    // NOTE: FIND ONE is READ operation, the output holds the results of the operation.
    // so we add it in our res.json()
    console.log("third");
  };

  async function updateSingleTodo(req,res) {
   
    try {
        await Todo.updateOne(
            {uuid:  req.params.id},
            {$set: {
                completed: true,
                dateCompleted: new Date(),
                status: "complete"
              }
                });

              res.json({
                success: true,
                message: `todo entry id ${req.params.id} updated`
                });
    } catch (error) {
        console.log(error);
        throw error;        
    }
    
  }
  
  async function deleteSingleTodo(req,res){
    
    try {
        await Todo.deleteOne({uuid: req.params.id});
        
        res.json({
            success: true,
            message: `todo entry id ${req.params.id} deleted`
        })

    } catch (error) {
        console.log(error);
        throw error;
    }    
  }

  async function updateManyTodo(req,res){
    try {
        await Todo.updateMany(
            { completed: req.params.completed }, 
            
            {$set: {
                completed: true, 
                dateCompleted: new Date(),
                status: "complete"
            }
                });

                res.json({
                    success: true,
                    message: `todo entry id ${req.params.completed} updated`
                   
                    })
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  async function deleteManyTodo(req,res){
    try {
        const deleteResults = db.collection('todo_items').deleteMany({ "completed" : false });

        res.json({
            success: true,
            deleteResults: deleteResults,
            message: `Successfully deleted `
        })

     } catch (error) {
        console.log(error);
        throw error;
    }    
    

} 
  


module.exports = {
    createOneTodo,
    createManyTodo,
    getAllTodos,
    getSingleTodo,
    singleTodoById,
    updateSingleTodo,
    deleteSingleTodo,
    updateManyTodo,
    deleteManyTodo,

};