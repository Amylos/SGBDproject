
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
        const [rows] = await req.db.query("SELECT * FROM produits");
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};



