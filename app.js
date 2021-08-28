// Module imports
const express = require('express');
const mongoose = require('mongoose');
const path = require ('path');
const handlebars = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/config');
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
const defaultRoutes = require('./routes/defaultRoutes');
app.use('/', defaultRoutes);
// app.use('/admin', adminRoutes);

// View Engine setup using Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'default'}));
app.set('view engine', 'handlebars');