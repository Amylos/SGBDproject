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
            "prix" : parseFloat(produit.prix)
        });
    });
    console.log(structureJSON);
    InsererDansMongo(1, structureJSON);
}

async function TransformeGamEZ(revendeur){

    console.log(`Les données vont être transformer avec la structure de GamEZ`);
    const [produits] = await RécupérerProduits(revendeur);

    let structureJSON = [];

    produits.map((produit)=>{
        structureJSON.push(
            {
            "results": [
                {
                "product": {
                    "product_name": produit.produit_nom,
                    "product_description": produit.description, 
                    "product_price": parseFloat(produit.prix),
                    "product_status": produit.status === "disponible" ? "available" : "unavailable",
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
                "p_seller": `{\\"id\\":${produit.fournisseurs_id},\\"name\\":\\"${produit.fournisseur_nom}\\",\\"creation_date\\":\\"${produit.date_creation}\\"}`
        })
    });
    console.log(structureJSON);

    InsererDansMongo(3, structureJSON);
}

// Check dans la base de données mongo si les produits existent déjà et si oui on les met à jour sinon on les insèrent

async function AddOnSportSalut(mongoDB, produits) {
    const documents = await mongoDB.collection('sportsalut').find().toArray();
    const produitsExistant = documents.map((doc) => doc.nom_produit);

    for (let produit of produits) {
        if (produitsExistant.includes(produit.nom_produit)) {
            await mongoDB.collection('sportsalut').updateOne(
                { nom_produit: produit.nom_produit },
                { $set: produit }
            );
        } else {
            await mongoDB.collection('sportsalut').insertOne(produit);
        }
    }
}

async function AddOnGamEZ(mongoDB, produits) {
    const documents = await mongoDB.collection('gamez').find().toArray();
    const produitsExistant = documents.map((doc) => doc.product_name);

    for (let produit of produits) {
        if (produitsExistant.includes(produit.product_name)) {
            await mongoDB.collection('gamez').updateOne(
                { product_name: produit.product_name },
                { $set: produit }
            );
        } else {
            await mongoDB.collection('gamez').insertOne(produit);
        }
    }
}

async function AddOnMedidonc(mongoDB, produits) {
    const documents = await mongoDB.collection('medidonc').find().toArray();
    const produitsExistant = documents.map((doc) => doc.p_name);

    for (let produit of produits) {
        if (produitsExistant.includes(produit.p_name)) {
            await mongoDB.collection('medidonc').updateOne(
                { p_name: produit.p_name },
                { $set: produit }
            );
        } else {
            await mongoDB.collection('medidonc').insertOne(produit);
        }
    }
}

async function InsererDansMongo(revendeur, produits) {
    if (produits.length === 0) {
        console.log('Aucun produit à insérer.');
        process.exit(0);
    }

    const mongoDB = await connectMONGO();
    try {
        switch(revendeur){
            case 1: // revendeur sportsalut
                await AddOnSportSalut(mongoDB, produits);
                break;
            case 2: // revendeur gamez
                await AddOnGamEZ(mongoDB, produits);
                break;
            case 3:  // revendeur medidonc
                await AddOnMedidonc(mongoDB, produits);
                break;
            default:
                throw new Error('Revendeur non reconnu');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await mongoDB.client.close();
        console.log('MongoDB connection closed.');
        process.exit(0); // Ensure this is called after the connection is closed
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