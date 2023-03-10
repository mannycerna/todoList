// import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


// create a todoSchema
const todoSchema = new mongoose.Schema({
    uuid: {
        uuid: {type: String, 
               default: uuidv4()},
    },
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateCompleted: {
        type: Date
    },
    status: {
        type: String,
        default: 'incomplete',
        enum: [
            'incomplete', 'complete', 'deferred'
        ],
        required: true
    },
    priority: {
        type: Number
    }


});

// register model to collection
const Todo = mongoose.model("todo_items", todoSchema);

// make our model accessible to outside files
module.exports = Todo;
