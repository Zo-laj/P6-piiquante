const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;
