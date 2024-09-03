const express = require('express');

const router = express.Router();
const adminController = require('./../controllers/admin.controller');
const { validateToken } = require('../middleware/auth');

router.get('/signin', adminController.loginPage);

router.post('/signin', adminController.adminLoign);

router.get('/logout', validateToken, adminController.adminSignOut);

router.get('/', validateToken, adminController.homePage);

router.get('/edit/:id', validateToken, adminController.editPage);

router.put('/:id', validateToken, adminController.adminEditOrder);

router.delete('/:id', validateToken, adminController.adminDelOrder);

router.post('/', validateToken, adminController.adminSearch);

module.exports = router;