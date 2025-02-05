const connectMYSQL = require('../config/mysqldb')

module.exports.AjouterProduit = async(req,res) =>{
    console.log('z')
    try{
        const [rows] = await connectMYSQL.query("CALL AjouterProduit(?, ?, ?, ?, ?, ?)", [
          'TESST',
          'TESST',
          10,
          'TESST',
          'TESST',
          'TESST'
        ]);
        console.log('Produit ajouté:', rows);
    }
    catch(err){
        res.status(400).json(err);
    }
}

module.exports.ModifierProduit = async(req,res) =>{
    try{

    }
    catch(err){
        res.status(400).json(err);
    }
}

module.exports.AfficherProduit = async(req,res) =>{
    try{

    }
    catch(err){
        res.status(400).json(err);
    }
}



