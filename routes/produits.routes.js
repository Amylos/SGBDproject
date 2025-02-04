const express = require('express');
const router = express.Router();
const {AjouterProduit,ModifierProduit, AfficherProduit} = require('../controllers/produits.controller');

router.get('/',AfficherProduit);
router.post('/',AjouterProduit);
router.patch('/:id',ModifierProduit);

module.exports = router;