// Module imports
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const handlebars = require('express-handlebars');
const flash = require('flash');
const session = require('express-session');


// MongoDB connection, globalVariables imported here
const {mongoDbUrl, PORT, globalVariables} = require('./config/config');

const app = express();

// Config express - .Use, configure middleware/plugins
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Flash/Sessions
app.use(session({
    secret: 'anysecret',
    // Save session even if no modification has occurred
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(globalVariables);

// Config Mongoose connection to MongoDB
mongoose.connect(mongoDbUrl)
    .then(response => {
        console.log("MongoDB connection successful");
    }).catch( err => {
        console.log("Database connection failed" + err);
    });

// Routes
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require ('./routes/adminRoutes')
app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

// View Engine setup using Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

// Create server + start it, assuming everything else runs fine
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
});
