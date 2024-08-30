const Member = require("../models/member.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.homePage = (req, res) => {
    res.render('user/index');
}

exports.bookPage = (req, res) => {
    res.render('user/book');
}

exports.chefInfoPage = (req, res) => {
    res.render('user/chef');
}

exports.contactPage = (req, res) => {
    res.render('user/contact');
}

exports.loginPage = (req, res) => {
    res.render('user/signin');
}

exports.registerPage = (req, res) => {
    res.render('user/signup');
}

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        console.log(req.body.username);
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required." });
        }

        if (password != confirmPassword) {
            res.status(400).json({ message: "Password in not match." });
        }

        const existUserCheck = await Member.findOne({ email: req.body.email });
        if (existUserCheck) {
            res.status(400).json({ message: "Email already exists." });
        }

        const member = await Member.create({
            username,
            email,
            password
        });

        const token = jwt.sign({ id: member._id, email: member.email, }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token);

        console.log("Register is successfully!");
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const member = await Member.findOne({ email });

        if (member) {
            const passwordMatch = await bcrypt.compare(password, member.password);

            if (passwordMatch) {
                const token = jwt.sign({ id: member._id, email: member.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.cookie("token", token);

                console.log("Login is successfully!");
                res.redirect('/');
            } else {
                req.flash("error", "Incorrect password.");
                res.redirect('/signin');
            }
        } else {
            req.flash("error", "User not found.");
            res.redirect('/signin');
        }
    } catch (error) {
        console.log("Login is failed.");
        console.log(error);

        req.flash("error", "Login is failed.");
        res.redirect('/signin');
    }
}

exports.useSignOut = (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    console.log("Logout.");
    res.redirect("/");
};
