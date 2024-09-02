const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.homePage);

router.get('/book', userController.bookPage);

router.get('/chef', userController.chefInfoPage);

router.get('/contact', userController.contactPage);

router.get('/order',userController.orderPage);

router.get('/checkout',userController.checkoutPage);

router.post('/', userController.userCheckout);

module.exports = router;