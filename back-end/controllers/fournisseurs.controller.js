
module.exports.ModifierFournisseur = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom } = req.body;
        const [rows] = await req.db.query("CALL ModifierFournisseur(?, ?)", [id, nom]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.AfficherFournisseur = async (req, res) => {
    try {
        const [rows] = await req.db.query("SELECT * FROM fournisseurs");
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.SupprimerFournisseur = async (req, res) => {
    try {
        console.log('SupprimerFournisseur');
        const { id } = req.params;
        const [rows] = await req.db.query("CALL SupprimerFournisseur(?)", [id]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
};

