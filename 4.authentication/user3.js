"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var login = function (req, res) {
    console.log('session login');
    req.session.userid = 5;
    res.send("<h1>Hello ".concat(req.session.userid, " </h1>"));
};
var verify = function (req, res) {
    console.log('session Test');
    if (req.session.id) {
        res.send('Session ' + req.session.userid);
    }
    else {
        res.send('Missing Session');
    }
};
var deleteuser = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        }
        else {
            res.send('Session cookie destroyed');
        }
    });
};
// Assign route handlers to routes
router.get('/login', login);
router.get('/verify', verify);
router.get('/delet', deleteuser);
exports["default"] = router;
