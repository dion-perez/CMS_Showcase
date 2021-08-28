// Module imports
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const handlebars = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/config');

// Connection values (port/mongoDB string etc)

const app = express();

// Create server + start it
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
});

// Config Mongoose connection to MongoDB
mongoose.connect(mongoDbUrl)
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
app.use((req, res) => {
    res.render('default/index.handlebars');
});

// View Engine setup using Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');