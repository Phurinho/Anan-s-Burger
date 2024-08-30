const express = require('express');

const router = express.Router();
const memberController = require('../controllers/member.controller');
const { validateToken } = require('./../middleware/auth');

router.get('/profile', validateToken, memberController.profilePage);

module.exports = router;