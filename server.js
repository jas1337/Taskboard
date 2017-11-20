const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const port = 3000;

const app = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');



// Connect to MongoDB
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(config.databaseTest);
    mongoose.connection.on('connected', () => {
        console.log('Connected to database :' + config.databaseTest);
    });
} else {
    mongoose.connect(config.database);
    mongoose.connection.on('connected', () => {
        console.log('Connected to database :' + config.database);
    });
}

//Log on error
mongoose.connection.on('error', (err) => {
    console.log('Database error :' + err);
});

//Use CORS Middleware. Allows communication to API from different Port
app.use(cors());
//Use Body Parser Middleware. Parse incoming request bodies,available under the req.body property
app.use(bodyParser.json());
//Every request on .../users/... goes to users.js file etc.
app.use('/users', users);
app.use('/tasks', tasks);

app.listen(port, () => console.log("Server running on port :" + port));


module.exports = app; // for testing

