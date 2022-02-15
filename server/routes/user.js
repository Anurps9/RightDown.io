const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.use(express.json())

router
.get('/', (req, res) => {
    User.find({}, (err, user) => {
        catchError(err, res)
        res.status(200).json(user)
    })
})
.get('/:id', (req, res) => {
    User.findOne({id: req.params.id}, (err, user) => {
        catchError(err, res)
        res.status(200).json(user)
    })
})
.post('/', (req, res) => {
    User.findOne({id: req.body.id}, (err, user) => {
        catchError(err, res)
        if(user){
            res.status(200).json(null)
            return;
        }
        const newUser = new User(req.body)
        newUser.save((err, user) => {
            catchError(err, res)
            res.status(200).json(newUser)
        })
    })
})
.put('/:id', (req, res) => {
    User.findOne({id: req.params.id}, (err, user) => {
        catchError(err, res)
        if(!user){
            res.status(200).json(null)
            return;
        }
        user.replaceOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.patch('/:id', (req, res) => {
    User.findOne({id: req.params.id}, (err, user) => {
        catchError(err, res)
        if(!user){
            res.status(200).json(null)
            return;
        }
        user.updateOne(req.body, (err, result) => {
            catchError(err, res)
            res.status(200).json(result)
        })
     })
})
.delete('/:id', (req, res) => {
    User.deleteOne({id: req.params.id}, (err, result) => {
        catchError(err, res)
        res.status(200).json(result)
    })
})
.delete('/', (req, res) => {
    User.deleteMany({}, (err, result) => {
        catchError(err, res)
        res.status(200).json(result)
    })
})

const catchError = (err, res) => {
    if(err){
        res.sendStatus(500)
        throw err;
    }
}

module.exports = router;
