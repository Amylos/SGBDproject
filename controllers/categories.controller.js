
module.exports.AfficherCategories = async(req,res) =>{
    try{
        res.status(200).json('RES');
    }
    catch(err){
        res.status(400).json(err);
    }
}