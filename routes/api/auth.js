const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../../models/User');
const config = require('./../../config');
const secret = process.env.SECRET || config.secret;
const expiration = process.env.EXPIRATION || config.expiration;

router.route('/')
    .post((req, res) => {
        const { email, password } = req.body;
        if (!email && !password) {
            res.status(400).json({
                message: 'You must send user and password.',
            });
        } else {
            User.findOne(
                { email },
                (err, user) => {
                    if (err) throw err;
                    if (!user) {
                        res.status(403).send({
                            message: 'The user does not exist.'
                        });
                    } else {
                        // el usuario existe
                        user.comparePassword(password, (err, match) => {
                            if (match && !err) {
                                const token = jwt.sign(
                                    user.toJSON(),
                                    secret,
                                    {
                                        expiresIn: expiration
                                    }
                                );
                                res.send({
                                    user,
                                    token,
                                    message: 'Logged!',
                                });
                            } else {
                                res.status(400).send({ message: 'Password incorrecta.' });
                            }
                        });
                    }
                }
            );
        }
    });
module.exports = router;
