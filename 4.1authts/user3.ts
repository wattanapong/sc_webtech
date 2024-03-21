import express, { Request, Response } from 'express';
const router = express.Router();

const login = (req: Request, res: Response) => {
    console.log('session login')
    req.session.userid = 5
    res.send(`<h1>Hello ${req.session.userid} </h1>`)
}

const verify = (req: Request, res: Response) => {
    console.log('session Test')

    if (req.session.id) {
        res.send('Session ' + req.session.userid)
    } else {
        res.send('Missing Session')
    }
}

const deleteuser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            res.send('Session cookie destroyed');
        }
    });
}

// Assign route handlers to routes
router.get('/login', login);
router.get('/verify', verify);
router.get('/delet', deleteuser);

export default router;