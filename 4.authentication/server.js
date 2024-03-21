"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_session_1 = require("express-session");
// const userRouter = require('./user3');
var user3_1 = require("./user3");
var app = (0, express_1["default"])();
// Configure session middleware
app.use((0, express_session_1["default"])({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));
// Use userRoutes for handling routes
app.use('/user', user3_1["default"]);
// Start server
var port = 3000;
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
