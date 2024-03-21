const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path')
const md5 = require('md5')
const cookie = require('cookie-parser');
const userRouter = require('./user');
const userRouter2 = require('./user2');
const session = require('express-session')

require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 3306,
});

const app = express()

// Configure the session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // You may set other cookie options here
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookie());

let root_path = path.resolve(__dirname, 'static')

app.use(express.static(root_path));

app.get('/login', (req, res) => {
    // res.render('member/login')
    const username = req.cookies.username;
    if (username)
        res.redirect('/member/member.html')
    else
        res.redirect('/member/login.html')
});

app.get('/member', (req, res) => {
    //res.render('member/member')
    const username = req.cookies.username;
    if (username)
        res.redirect('/member/member.html')
    else
        res.redirect('/member/login.html')
});

app.get('/logout', (req, res) => {
    const username = req.cookies.username;
    if (username)
        res.clearCookie('username')

    res.redirect('/member/login.html')
});

app.post('/verify', (req, res) => {
    const { username, password } = req.body
    const sql = "SELECT * FROM member WHERE username = ? and password = ? "

    pool.query(sql, [username, md5(password)], (err, results) => {
        if (err) {
            console.log(err)
            res.json({ 'msg': 'failed' })
        } else {
            if (results.length == 0)
                res.json({ 'msg': 'Wrong Username or Password' })
            else {
                res.cookie('username', username, { maxAge: 900000 });
                res.json({ 'username': username, 'msg': 'Welcome' })
            }

        }
    })
})

app.post('/add', (req, res) => {
    const { username, password } = req.body
    console.log(username, password)
    const sql = 'INSERT INTO member (username, password) VALUES (?, ?)';
    pool.query(sql, [username, md5(password)], (err, results) => {
        if (err) {
            console.log(err)
            res.json({ 'msg': 'failed' })
        } else {
            res.json({ 'msg': 'done' });
        }
    })
})

app.get('/setusername', (req, res) => {
    req.session.username = 'example_user';
    res.send('Session cookie set');
})

app.get('/checkusername', (req, res) => {
    if (req.session.username){
        res.send('Session '+ req.session.username)
    }else{
        res.send('Missing Session')
    }
    
})

app.get('/delusername', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            res.send('Session cookie destroyed');
        }
    });
        
})

app.use('/user/login', userRouter.login)
app.use('/user/verify', userRouter.verify)
app.use('/user/delete', userRouter.delete)

app.use('/user2', userRouter2)

app.get('*', (req, res) => {
    res.redirect('/login')
})

// Start the Express server
port = 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});