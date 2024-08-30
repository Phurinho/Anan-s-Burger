const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.homePage);

router.get('/book', userController.bookPage);

router.get('/chef', userController.chefInfoPage);

router.get('/contact', userController.contactPage)

router.get('/signin', userController.loginPage);

router.get('/signup', userController.registerPage);

router.post('/signup', userController.userRegister);

router.post('/signin', userController.userLogin);

router.get('/logout', userController.useSignOut);

module.exports = router;