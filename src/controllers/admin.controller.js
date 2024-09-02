const Admin = require('./../models/admin.model');
const jwt = require('jsonwebtoken');

exports.homePage = (req, res) => {
    res.render('admin/adminHome')
}

exports.loginPage = (req, res) => {
    res.render('admin/signin');
}

exports.adminLoign = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin) {
            const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie("token2", token);

            console.log("Login is successfully!");
            res.redirect('/admin');

        } else {
            req.flash("error", "Admin not found.");
            res.redirect('/admin/signin');
        }
    } catch (error) {
        console.log("Login is failed.");
        console.log(error);

        req.flash("error", "Login is failed.");
        res.redirect('/admin/signin');
    }
}

exports.adminSignOut = (req, res) => {
    res.cookie("token2", "", { maxAge: 1, path: '/' });  
    console.log("Logout.");
    res.redirect("/");
};