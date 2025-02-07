const express = require('express');
const router = express.Router();
const {AfficherCategories} = require('../controllers/categories.controller');

router.get('/', AfficherCategories);

module.exports = router;