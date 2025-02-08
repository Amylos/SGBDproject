
# Projet de Gestion de Données

Ce projet, réalisé par **Enzo Fautrat**, **Sachiyo SABLE** et **Andrew Garnier**, est une application permettant la gestion et la manipulation de données stockées dans une base de données relationnelle (SGBDR) et MongoDB.

L'application offre des fonctionnalités de récupération et de modification des données concernant les produits, fournisseurs et catégories.

## Technologies utilisées

- **Base de données** : SQL & MongoDB
- **Backend** : Node.js avec Express.js
- **Frontend** : React

## Lancer le projet

### Frontend

1. Générer les packages nécessaire dans les dossiers `back-end`  et `front-end` avec la commande : 
   ```bash
   npm install
   ```

2. Allez dans le dossier `back-end` et lancez le serveur avec la commande :
   ```bash
   npm start
   ```

3. Ensuite, allez dans le dossier `front-end` et lancez le frontend avec la commande :
   ```bash
   npm start
   ```

### Récupération et transfert de données MySQL à MongoDB

Le programme qui récupère les données de MySQL et les transfère aux revendeurs dans la base MongoDB se lance avec la commande :
    ```bash
    node ./mySQLtoMongo.js
    ```

## Côté client

- **Récupération des données** : La liste des fournisseurs, des catégories et des produits est récupérée grâce à une commande `SELECT`.
- **Modification, ajout et suppression** : Ce sont des procédures stockées qui sont mises en place. Vous pouvez interagir avec l'API via les méthodes `POST`, `DELETE` et `PATCH` pour accéder à ces procédures.

---

Merci d'utiliser cette application ! <3
