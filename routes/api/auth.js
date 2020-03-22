const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../../models/User');
const config = require('./../../config');
const secret = process.env.SECRET || config.secret;
const expiration = process.env.EXPIRATION || config.expiration;
const BadRequestError = require('./../../utilities/errors/BadRequestError');

router.post('/', (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        next(new BadRequestError('You must send email and password'));
    } else {
        User.findOne(
            { email },
            (err, user) => {
                if (err) throw err;
                if (!user) {
                    next(new BadRequestError('The user does not exist.'));
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
                                'access_token': token,
                                'expires_in': config.expiration
                            });
                        } else {
                            next(new BadRequestError('Wrong Password!'));
                        }
                    });
                }
            }
        );
    }
});

router.get('/', (req, res, next) => {
    res.send({
        message: 'Access token'
    });
});

router.post('/post', async (req, res, next) => {
    const users = await User.find({});

    res.send(users);
});

module.exports = router;
