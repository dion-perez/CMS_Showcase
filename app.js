// Module imports
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const handlebars = require('express-handlebars');

// Connection values (port/mongoDB string etc)
const port = 3000;
const mongoDBString = 'mongodb+srv://Dion:uyvcRuZPiEpjmNpe@cluster0.bc7xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();

// Config Mongoose connection to MongoDB
mongoose.connect(mongoDBString)
    .then(response => {
        console.log("MongoDB connection successful");
    }).catch( err => {
        console.log("Database connection failed" + err);
    });

// Config express - .Use, configure middleware/plugins
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Anyone using localhost:3000 will get this response
app.use('/', (req, res) => {
    res.send("Welcome to the CMS application");
});

// Create server + start it
app.listen(port, () => {
   console.log("Server is running on port " + port)
});

// View Engine setup using Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');