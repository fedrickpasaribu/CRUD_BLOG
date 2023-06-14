const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
    })

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass
    })
    user.save()
        .then(user => {
            res.json({
                message: 'User Added!'
            })
        })
        .catch(error => {
            res.json({
                message: 'Error Occured!'
            })
        })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                        if (result) {
                            let token = jwt.sign({ name: user.name }, 'AzQ,PI', { expiresIn: '1h' })
                            res.json({
                                message: 'Login Success!',
                                token
                            })
                        } else {
                            res.json({
                                message: 'Password does not matched!'
                            })
                        }
                    }
                })
            } else {
                res.json({
                    message: 'User not found!'
                })
            }
        })
}

module.exports = {
    register,
    login
}