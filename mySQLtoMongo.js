const connectMYSQL = require('./config/mysqldb');
const connectMONGO = require('./config/mongodb');
const readline = require('readline');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function DemanderRevendeur() {
    return new Promise((resolve) => {
        rl.question(`Quel est le revendeur ? \n
            - 1 Sport Salut  \n
            - 2 GamEZ  \n
            - 3 Medidonc \n`, (revendeur) => {
            resolve(revendeur);
            rl.close();
        });
    });
}

async function RécupérerProduits(revendeur) {
    const mysqlDB =  await connectMYSQL();

    try{
        let rows;
        switch(revendeur){
        case '1' || 1: // ProduitsSportSalut
            [rows] =  await mysqlDB.query("CALL ProduitsSportSalut()");
            break;
        case '2' || 2: // ProduitsGamEZ
            [rows] =  await mysqlDB.query("CALL ProduitsGamEZ()");
            break;
        case '3' || 3: // ProduitsMEDIDONC
            [rows] =  await mysqlDB.query("CALL ProduitsMEDIDONC()");
            break;
        default:
            break;
        }
        return rows;
    }
    catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return false;
    }
}

// Transformer les données récupérées en JSON

async function TransformeSportSalut(revendeur){
    console.log(`Les données vont être transformer avec la structure de Sport Salut`);
    const [produits] = await RécupérerProduits(revendeur);

    let structureJSON = [];

    produits.map((produit)=>{
        structureJSON.push({
            "nom_produit": produit.produit_nom,
            "description_produit" : produit.description,
            "nom_fournisseur": produit.fournisseur_nom,
            "en_stock": produit.status === 'disponible' ? 'Oui' : 'Non',
            "prix" : produit.prix
        });
    });
    console.log(structureJSON);
    InsererDansMongo(1, structureJSON);
}

async function TransformeGamEZ(revendeur){

    console.log(`Les données vont être transformer avec la structure de GamEZ`);
    const [produits] = await RécupérerProduits(revendeur);

    console.log(produits);

    let structureJSON = [];

    produits.map((produit)=>{
        structureJSON.push(
            {
                "results": [
                    {
                        "product": {
                            "product_name": produit.produit_nom,
                            "product_description": produit.description, // Ajouter un champ pour jeuvidéo ou jeu de société
                            // Calcul automatique : +10% si jeu vidéo,
                            // +15% si jeu de société
                            "product_price": produit.prix,
                            "product_status": produit.status === "disponible" ? "avalaible" : "unavalaible", // ou "unavailable"
                        },
                        "seller": {
                            "seller_name" : produit.fournisseur_nom,
                            "seller_creation_date" : produit.date_creation
                        }
                    }
                ]
            }
        )
    });

    console.log(JSON.stringify(structureJSON, null, 2));
    InsererDansMongo(2, structureJSON);

}

async function TransformeMedidonc(revendeur){
    console.log(`Les données vont être transformer avec la structure de Medidonc`)
    const [produits] = await RécupérerProduits(revendeur);

    let structureJSON = [];

    produits.map((produit)=>{
        console.log(produit);
        structureJSON.push({
                "p_name": produit.produit_nom,
                "p_description" : produit.description,
                "p_last_update": produit.date_modification,
                "p_status": produit.status === "dispnible" ? "En stock" : "En rupture de stock",
                "p_seller": `{ id : ${produit.fournisseurs_id}, name : ${produit.fournisseur_nom}, creation_date : ${produit.date_creation}}`
        })
    });
    console.log(structureJSON);

    InsererDansMongo(3, structureJSON);
}

async function InsererDansMongo(revendeur,produits){
    const mongoDB =  await connectMONGO();
    try{
        let result;
        switch(revendeur){
            case 1:
                result = await mongoDB.collection('sportplus').insertMany(produits);
                break;
            case 2:
                result  = await mongoDB.collection('gamez').insertMany(produits);
                break;
            case 3:
                result = await mongoDB.collection('medidonc').insertMany(produits);
                break;
            default:
                break;
        }
        console.log(result);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoDB.client.close();
        console.log('MongoDB connection closed.');
        process.exit(0);
    }
}


async function main(){
    const revendeur = await DemanderRevendeur();

    switch (revendeur) {
        case '1' || 1:
            await TransformeSportSalut(revendeur);
            break;
        case '2' || 2:
            await TransformeGamEZ(revendeur);
            break;
        case '3' || 3:
            await TransformeMedidonc(revendeur);
            break;
        default:
            break;
    }
}

main();