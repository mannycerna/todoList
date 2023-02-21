const Todo = require('../models/Todos');
const {v4: uuidv4} = require("uuid");
const {db, insertMany} = require('../models/Todos');
const {Model} = require('mongoose');

// create a single todo item and save in database
async function createOneTodo(req, res) {

    try { // parse out fields from POST request


        let new_item = Todo.create({
            taskName: req.body.taskName,
            description: req.body.description,
            completed: req.body.completed,
            status: req.body.status,
            priority: req.body.priority

        })


        // const updateList = await Todo()
        // // .collection('todo_data')
        // .create(new_item);

        // const taskName = req.body.taskName
        // const description = req.body.description
        // const completed = req.body.completed
        // // const dateCreated = req.body.dateCreated
        // // const dateCompleted = req.body.dateCompleted
        // const status = req.body.status
        // const priority = req.body.priority

        // /*pass fields to new Blog model notice how mongoose allows for clear organization and type checking of fields automatically based on schema (models/Blogs.js)*/
        // const newTodo = new Todo({
        //     uuid: uuidv4(),
        //     taskName,
        //     description,
        //     completed,
        //     // dateCreated,
        //     // dateCompleted,
        //     status,
        //     priority
        // });


        // return the request to the user
        // res.json({success: true, todos: newTodo});
        res.json({succes: true, todos: new_item})

    } catch (e) {
        console.log(typeof e);
        console.log(e);
        res.json({error: e.toString()});
    }
};

// create a many todo item and save in database  //https://stackoverflow.com/questions/19701154/mongoose-whats-the-differences-between-model-create-and-collection-inserts

async function createManyTodo(req, res) {
    try {
        const insertedTodo = db.collection('todo_items').insertMany(req.body.todos, function (err, todos) {
            // if(err) console.log(err);
            // else console.log("todos Added Succesfully.");
        });

        res.json({success: true, insertedTodo: insertedTodo})

    } catch (error) {
        console.log(error);
    }
};

// get all items from database
async function getAllTodos(req, res, next) {

    try {
        const allTodos = await Todo.find({}).select('-__v') // '=__v' hides the version entry in json output
        res.json({success: true, allTodos: allTodos});
    } catch (error) {
        console.log(error);
    }


};

// search and return item from the database by task name
async function getSingleTodo(req, res) {
    let singleTodo;

    try {
        singleTodo = await Todo.findOne({taskName: req.params.taskName});
    } catch (error) {
        console.log(error);
    }
    res.json({success: true, oneTodo: singleTodo})
}

// searh by id and return item from database
async function singleTodoById(req, res, next) { // checking if the parameter ID was passed in
    if (! req.params.id) {
        res.json({success: false, message: "The blog id must be provided in the url parameters"});
        return;
    }

    console.log("first");
    // await blocks the execution until the promise resolves
    // aka. make sure line 47 finishes before we get on
    // with the rest of our program
    try {
        const todoTask = await Todo.findOne({uuid: req.params.id}).catch((error) => {
            console.log("something went wrong");
        });
        console.log("second");
        res.json({success: true, posts: todoTask});
    } catch (e) {
        console.log(e);
    }
    // NOTE: FIND ONE is READ operation, the output holds the results of the operation.
    // so we add it in our res.json()
    console.log("third");
};

// search by id and update a single item from database
async function updateSingleTodo(req, res) {

    try {
        await Todo.updateOne({
            uuid: req.params.id
        }, {
            $set: {
                completed: true,
                dateCompleted: new Date(),
                status: "complete"
            }
        });

        res.json({
                success: true, message: `todo entry id ${
                req.params.id
            } updated`
        });
    } catch (error) {
        console.log(error);
        throw error;
    }

}

// search by id and delete a single item from database
async function deleteSingleTodo(req, res) {

    try {
        await Todo.deleteOne({uuid: req.params.id});

        res.json({
                success: true, message: `todo entry id ${
                req.params.id
            } deleted`
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateManyTodo(req, res) {
    try {
        await Todo.updateMany({
            completed: req.params.completed
        }, {
            $set: {
                completed: true,
                dateCompleted: new Date(),
                status: "complete"
            }
        });

        res.json({
                success: true, message: `todo entry id ${
                req.params.completed
            } updated`
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// search for many items based on status of complete in database and delete all documents (records) that match that search crietia rom database
async function deleteManyTodo(req, res) {
    try {
        const deleteResults = db.collection('todo_items').deleteMany({"completed": false});

        res.json({success: true, deleteResults: deleteResults, message: `Successfully deleted `})

    } catch (error) {
        console.log(error);
        throw error;
    }


}

// export allows access by other modules of program
module.exports = {
    createOneTodo,
    createManyTodo,
    getAllTodos,
    getSingleTodo,
    singleTodoById,
    updateSingleTodo,
    deleteSingleTodo,
    updateManyTodo,
    deleteManyTodo

};
