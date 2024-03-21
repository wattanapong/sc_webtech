const login = async (req, res) => {
    console.log('session login')
    req.session.userid = 5
    res.send(`<h1>Hello ${req.session.userid} </h1>`)
}

const verify = async (req, res) => {
    console.log('session Test')

    if (req.session.id) {
        res.send('Session ' + req.session.userid)
    } else {
        res.send('Missing Session')
    }
}

const deleteuser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Error destroying session');
        } else {
            res.send('Session cookie destroyed');
        }
    });
}

module.exports = {
    'login': login,
    'verify': verify,
    'delete': deleteuser
}