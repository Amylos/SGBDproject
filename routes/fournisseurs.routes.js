const express = require('express');
const router = express.Router();
const {ModifierFournisseur,AfficherFournisseur,SupprimerFournisseur} = require('../controllers/fournisseurs.controller');

router.get('/', AfficherFournisseur);
router.patch('/:id', ModifierFournisseur);
router.delete('/:id', SupprimerFournisseur);

module.exports = router;



