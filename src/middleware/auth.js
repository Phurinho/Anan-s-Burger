require('dotenv').config();

const jwt = require('jsonwebtoken');

const Admin = require('./../models/admin.model');


const validateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.redirect('/');
                console.log("Admin is not authosized.");
            }
            req.name = decoded.name;

            next();
        });
    } else {
        res.redirect('/');
        console.log("Admin is not authosized.");
    }
}


const checkAdmin = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.admin = null;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) { next(); };

            const admin = await Admin.findById(decoded.id);
            res.locals.admin = admin;
            next();
        });
    } else {
        next();
    }
}

module.exports = { validateToken, checkAdmin };