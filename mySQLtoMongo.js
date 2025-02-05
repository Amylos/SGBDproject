const { Transform } = require('stream');
const connectMYSQL = require('./config/mysqldb');
const readline = require('readline');

const rl = readline.createInterface({ 
  input: process.stdin, 
  output: process.stdout 
});

async function RécupérerProduits(revendeur) {

  const db =  await connectMYSQL();

  switch(revendeur){
    case '1' || 1:
      try {
        // const [produits] = await db.query("SELECT * FROM produits");
        // const produits = JSON.stringify(rows);
        return produits;
      }
      catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return false;
      }
      break;
    case '2' || 2:
      try {
        // const [produits] = await db.query("SELECT * FROM produits");
        // const produits = JSON.stringify(rows);
        return produits;
      }
      catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return false;
      }
      break;
    case '3' || 3:
      try {
        // const [produits] = await db.query("SELECT * FROM produits");
        // const produits = JSON.stringify(rows);
        return produits;
      }
      catch (err) {
        console.error('Erreur lors de la récupération des produits :', err);
        return false;
      }
      break;
    default:
      break;
  }
}

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

async function TransformeSportSalut(revendeur){
  console.log(`Les données vont être transformer avec la structure de Sport Salut`);
  let structureJSON = [];
    const produits = await RécupérerProduits(revendeur);

  produits.map((produit)=>{
    console.log(produit);
    structureJSON.push({
      // "nom_produit": produit.nom,
      // "description_produit" : produit.description,
      // "nom_fournisseur" : 
      // "en_stock":
    })
  })
}

async function TransformeGamEZ(produits){
  console.log(`Les données vont être transformer avec la structure de GamEZ`)


}

async function TransforMedidonc(produits){
  console.log(`Les données vont être transformer avec la structure de Medidonc`)


}


async function main(){
  const revendeur = await DemanderRevendeur();

  switch(revendeur){
    case '1' || 1:
      TransformeSportSalut(revendeur);
      break;
    case '2' || 2:
      TransformeGamEZ(revendeur);
      break;
    case '3' || 3:
      TransforMedidonc(revendeur);
      break;
    default:
      break;
  }
}

main();