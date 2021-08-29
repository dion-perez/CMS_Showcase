const {response} = require("express");
module.exports = {
    index: (req, res) => {
        res.render('default/index.handlebars');
    },

    loginGet: (req, res) => {
        res.render('default/login');
    },

    loginPost: (req, res) => {
        res.send("Login hit, data POST.")
    },

    registerGet: (req, res) => {
        res.render ('default/register');
    },

    registerPost: (req, res) => {
        res.send("Successfully registered");
    }

}