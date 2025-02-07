
module.exports.AjouterProduit = async (req, res) => {
    try {
        const { nom, description, prix_achat, status, categorie_nom, fournisseur_nom } = req.body;
        const [rows] = await req.db.query("CALL AjouterProduit(?, ?, ?, ?, ?, ?)", [
            nom, description, prix_achat, status, categorie_nom, fournisseur_nom
        ]);
        console.log('Produit ajouté: ', req.body);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.ModifierProduit = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix_achat, status, categorie_nom, fournisseur_nom } = req.body;
        const [rows] = await req.db.query("CALL ModifierProduit(?, ?, ?, ?, ?, ?, ?)", [
            id, nom, description, prix_achat, status, categorie_nom, fournisseur_nom
        ]);
        console.log('Produit modifié: ', req.body);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.AfficherProduit = async (req, res) => {
    try {
        const [rows] = await req.db.query(`SELECT produit_id, produit_nom, description, prix_achat, status, produits.date_creation, produits.date_modification, produits.fournisseur_id, produits.categorie_id, categorie_nom, fournisseur_nom
                                            FROM produits INNER JOIN categories ON produits.categorie_id = categories.categorie_id
                                            INNER JOIN fournisseurs ON produits.fournisseur_id = fournisseurs.fournisseur_id`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};



