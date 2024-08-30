require('dotenv').config();

const jwt = require('jsonwebtoken');

const Member = require('./../models/member.model');

const validateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.redirect('/');
                console.log("User is not authosized.");
            }
            req.name = decoded.name;

            next();
        });
    } else {
        res.redirect('/');
        console.log("User is not authosized.");
    }
}

const checkMember = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.member = null;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) { next(); };

            const member = await Member.findById(decoded.id);
            res.locals.member = member;
            next();
        });
    } else {
        next();
    }
}

module.exports = { validateToken, checkMember };