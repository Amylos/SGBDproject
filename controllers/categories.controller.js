
module.exports.AfficherCategories = async(req,res) =>{
    try {
        const [rows] = await req.db.query("SELECT * FROM categories");
        res.status(200).json(rows);
    } catch (err) {
        res.status(400).json(err);
    }
}