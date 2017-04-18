"use strict"

const express = require('express');
const homeController = require('../controllers/controller');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/',homeController.index);
router.get('/link',homeController.link);
router.get('/private',auth, homeController.privateArea);

module.exports = router;