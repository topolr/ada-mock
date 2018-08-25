let express = require("express");
let app = new express();
let bodyParser = require("body-parser");
let cookieParser = require('cookie-parser');
let session = require('express-session');

app.use(cookieParser('admin'));
app.use(session({
    secret: 'admin',
    resave: true,
    cookie: {maxAge: 8000000},
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;