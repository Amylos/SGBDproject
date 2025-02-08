Ce projet, réalisé par Enzo Fautrat, Sachiyo SABLE et Andrew Garnier, est une application permettant la gestion et la manipulation de données stockées dans une base de données relationnelle (SGBDR) et MongoDB.

L'application offre des fonctionnalités de récupération et de modification des données concernant les produits, fournisseurs et catégories.

Technologies utilisées
Base de données : SQL & MongoDB
Backend : Node.js avec Express.js
Frontend : React

Fonctionnalités principales
✔ Récupération des données stockées
✔ Modification des produits, fournisseurs et catégories
✔ Interface utilisateur intuitive avec React
✔ API performante et sécurisée avec Express.js


On peut lancer le front end en rentrant dans le dossier back-end et npm start et le front en rentrant dans ./front-end et npm start.

On peut aussi lancer le programme qui récupère les données de MYSQL et les transfert aux revendeurs dans la base mongo db en faisant node ./mySQLtoMongo.js


Côté client, on récupère la liste des fournisseurs, des catégories et des produits grâce à une commande SELECT.

Pour la modification l'ajout et la suppression, ce sont des procédure qui sont mises en place.

