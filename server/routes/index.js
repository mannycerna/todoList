const {v4: uuidv4} = require("uuid");
const express = require('express');
var router = express.Router();
require('dotenv').config();
const Todo = require('../models/Todos');


// const app = express();

// const port = process.env.PORT || 5001;

// app.use((req, res, next) => {
// res.header("Access-Control-Allow-Origin", "\*");
// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// next();
// });

router.get('/', async function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// app.use((req, res, next) => {
// res.send('Welcome to Express');
// });

// app.listen(port, () => {
// console.log(`Server running on port ${port}`)
// });

module.exports = router;
