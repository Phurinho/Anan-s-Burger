const Order = require('./../models/order.model');

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

exports.orderPage = (req,res) =>{
    res.render('user/order');
}

exports.checkoutPage = async (req,res) =>{
    res.render('user/checkout', { order: new Order() });
}

exports.userCheckout = async (req, res) => {
    try {
        const { username, email, tel, menu, description, createdAt } = req.body;
        const order = new Order({
            username,
            email,
            tel,
            menu,
            description,
            createdAt
        });

        await order.save();
        res.redirect('/');
        console.log('New order successfully');
        // console.log(order);
    } catch (error) {
        console.log(error);
    }
}