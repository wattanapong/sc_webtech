
const express = require('express');
const router = express.Router();
const session = require('express-session')

// Configure the session middleware
router.use(session({
    secret: 'your_secret_key', // Change this to your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // You may set other cookie options here
}));


router.get('/login', (req, res) => {
    console.log('session login')
    req.session.userid = 5
    res.send(`<h1>Hello ${req.session.userid} </h1>`)
})

router.get('/verify', (req, res) => {
    console.log('session Test')

    if (req.session.id) {
        res.send('Session ' + req.session.userid)
    } else {
        res.send('Missing Session')
    }
})

router.get('/delete', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            res.send('Session cookie destroyed');
        }
    });
})

module.exports = router