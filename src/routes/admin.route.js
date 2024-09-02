const express = require('express');

const router = express.Router();
const adminController = require('./../controllers/admin.controller');
const { validateAdminToken } = require('../middleware/auth');

router.get('/signin', adminController.loginPage);

router.post('/signin', adminController.adminLoign);

router.get('/logout', adminController.adminSignOut);

router.get('/', validateAdminToken, adminController.homePage);

module.exports = router;