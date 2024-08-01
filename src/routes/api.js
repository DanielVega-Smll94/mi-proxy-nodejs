const express = require('express');
const router = express.Router();
const decryptController = require('../controllers/decryptController');
const routerController = require('../controllers/routerController');

router.post('/login', decryptController.decryptData);
router.post('/router', routerController.routerData);

module.exports = router;
