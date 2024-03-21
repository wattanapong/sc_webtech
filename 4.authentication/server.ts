import express, { Express, Request, Response } from 'express';
import session from 'express-session';
// const userRouter = require('./user3');
import userRouter from './user3';

const app: Express = express();

// Configure session middleware
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true
}));

// Use userRoutes for handling routes
app.use('/user', userRouter );

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});