const Admin = require('./../models/admin.model');
const Order = require('./../models/order.model');
const jwt = require('jsonwebtoken');

exports.homePage = async (req, res) => {
    const order = await Order.find().sort({ createdAt: 'desc' });
    res.render('admin/adminHome', { orders: order });
}

exports.loginPage = (req, res) => {
    res.render('admin/signin');
}

exports.editPage = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.render('admin/editOrder', { order: order });
}

exports.adminLoign = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (admin) {
            const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie("token", token);

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
    res.cookie("token", "", { maxAge: 1, path: '/' });  
    console.log("Logout.");
    res.redirect("/");
};

exports.adminEditOrder = async (req, res) => {
    try {  
        const { username, email, tel, menu, description, createdAt } = req.body;
        await Order.findByIdAndUpdate(req.params.id, {
            username: username,
            email: email,
            tel: tel,
            menu: menu,
            description: description,
            createdAt: createdAt,
        });

        console.log('Edit order successfully');
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

exports.adminDelOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    console.log("Delete order successfully!");
    res.redirect('/admin');
}

exports.adminSearch = async (req, res) => {
    try {
        const { username } = req.body;
        const orderAll = await Order.find().sort({ createdAt: 'desc' });
        if (!username) {
            res.render('admin/adminHome', { orders: orderAll });
        }

        const order = await Order.find({ username: username });

        if (!order) {
            return res.status(404).send('Order not found');
        }

        console.log(order);
        res.render('admin/adminHome', { orders: order });
    } catch (error) {
        console.error('Error occurred while searching for order:', error);
        res.status(500).send('Internal Server Error');
    }
};
