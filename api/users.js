const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken')

const {createUser, getUserByUsername} = require ('../db')
const SECRET = require('./secret')

usersRouter.post('/register', async (req, res, next) => {
    try {
        console.log('CREATING THE USER');
        if(req.body.password.length < 8) {
            console.error('password too short')
            next()
            if(req.body.username === username) {
                console.log('name already taken')
                next()
            }
        }
            const user = await createUser(req.body);
            
            console.log(user)
            res.send({user});
    } catch (error) {
        console.log('THERE WAS AN ERROR');
        next(error);
    }
  });


  usersRouter.post('/login', async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.body.username);
        console.log(user)
        const token = jwt.sign({
            id: user.id,
            username: user.username
        }, SECRET);
        console.log(token);
        res.send({token});
        next()
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter
