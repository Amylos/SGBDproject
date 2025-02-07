CREATE DATABASE sgbdr_g3;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sgbdr_g3.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE sgbdr_g3;

DROP TABLE IF EXISTS produits;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories
(
    categorie_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    categorie_nom VARCHAR(255) UNIQUE NOT NULL,
    date_creation DATETIME NOT NULL
);

DROP TABLE IF EXISTS fournisseurs;
CREATE TABLE fournisseurs
(
    fournisseur_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fournisseur_nom VARCHAR(255) UNIQUE NOT NULL,
    date_creation DATETIME NOT NULL
);

CREATE TABLE produits
(
    produit_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    categorie_id TINYINT UNSIGNED NOT NULL,
    fournisseur_id TINYINT UNSIGNED NOT NULL,
    produit_nom VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    prix_achat SMALLINT UNSIGNED NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'disponible',
    date_creation DATETIME NOT NULL,
    date_modification DATETIME NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(categorie_id) ON DELETE CASCADE,
    FOREIGN KEY (fournisseur_id) REFERENCES fournisseurs(fournisseur_id) ON DELETE CASCADE
); 

DELIMITER //

DROP PROCEDURE IF EXISTS AjouterProduit //

CREATE PROCEDURE AjouterProduit(
    IN p_nom VARCHAR(255),
    IN p_description TEXT,
    IN p_prix_achat SMALLINT UNSIGNED,
    IN p_status VARCHAR(25),
    IN p_categorie_nom VARCHAR(255),
    IN p_fournisseur_nom VARCHAR(255)
)
BEGIN
    DECLARE v_categorie_id TINYINT UNSIGNED;
    DECLARE v_fournisseur_id TINYINT UNSIGNED;
    DECLARE v_now DATETIME;

    SET v_now = NOW();

    -- Vérifier si la catégorie existe déjà
    SELECT categorie_id INTO v_categorie_id FROM categories WHERE categories.categorie_nom = p_categorie_nom;

    -- Si la catégorie n'existe pas, la créer
    IF v_categorie_id IS NULL THEN
        INSERT INTO categories (categorie_nom, date_creation) 
        VALUES (p_categorie_nom, v_now);
        SET v_categorie_id = LAST_INSERT_ID();
    END IF;

    -- Vérifier si le fournisseur existe déjà
    SELECT fournisseur_id INTO v_fournisseur_id FROM fournisseurs WHERE fournisseurs.fournisseur_nom = p_fournisseur_nom;

    -- Si le fournisseur n'existe pas, le créer
    IF v_fournisseur_id IS NULL THEN
        INSERT INTO fournisseurs (fournisseur_nom, date_creation) 
        VALUES (p_fournisseur_nom, v_now);
        SET v_fournisseur_id = LAST_INSERT_ID();
    END IF;

    -- IF p_status != "disponible" || p_status != "en rupture" THEN
    --     SET p_status = "disponible";
    -- END IF;

    -- Insérer le produit avec la catégorie et le fournisseur
    INSERT INTO produits (produit_nom, description, prix_achat, status, categorie_id, fournisseur_id, date_creation, date_modification)
    VALUES (p_nom, p_description, p_prix_achat, p_status, v_categorie_id, v_fournisseur_id, v_now, v_now);
    
END //

DROP PROCEDURE IF EXISTS ModifierProduit //

CREATE PROCEDURE ModifierProduit(
    IN p_produit_id SMALLINT UNSIGNED,
    IN p_nom VARCHAR(255),
    IN p_description TEXT,
    IN p_prix_achat SMALLINT UNSIGNED,
    IN p_status VARCHAR(25),
    IN p_categorie_nom VARCHAR(255),
    IN p_fournisseur_nom VARCHAR(255)
)
BEGIN
    DECLARE v_categorie_id TINYINT UNSIGNED;
    DECLARE v_fournisseur_id TINYINT UNSIGNED;
    DECLARE v_now DATETIME;

    SET v_now = NOW();

    -- Vérifier si la catégorie existe déjà
    SELECT categorie_id INTO v_categorie_id FROM categories WHERE categories.categorie_nom = p_categorie_nom;

    -- Si la catégorie n'existe pas, la créer
    IF v_categorie_id IS NULL THEN
        INSERT INTO categories (categorie_nom, date_creation) 
        VALUES (p_categorie_nom, v_now);
        SET v_categorie_id = LAST_INSERT_ID();
    END IF;

    -- Vérifier si le fournisseur existe déjà
    SELECT fournisseur_id INTO v_fournisseur_id FROM fournisseurs WHERE fournisseurs.fournisseur_nom = p_fournisseur_nom;

    -- Si le fournisseur n'existe pas, le créer
    IF v_fournisseur_id IS NULL THEN
        INSERT INTO fournisseurs (fournisseur_nom, date_creation) 
        VALUES (p_fournisseur_nom, v_now);
        SET v_fournisseur_id = LAST_INSERT_ID();
    END IF;

    -- Mettre à jour le produit avec la catégorie et le fournisseur
    UPDATE produits
    SET produit_nom = p_nom,
        description = p_description,
        prix_achat = p_prix_achat,
        status = p_status,
        categorie_id = v_categorie_id,
        fournisseur_id = v_fournisseur_id,
        date_modification = v_now
    WHERE produit_id = p_produit_id;
    
END //

DROP PROCEDURE IF EXISTS ModifierFournisseur //
CREATE PROCEDURE ModifierFournisseur(
    IN p_fournisseur_id TINYINT UNSIGNED,
    IN p_nom VARCHAR(255)
)
BEGIN
    -- Mettre à jour le fournisseur
    UPDATE fournisseurs SET fournisseur_nom = p_nom WHERE fournisseur_id = p_fournisseur_id;
    
END //

DROP PROCEDURE IF EXISTS SupprimerFournisseur //
CREATE PROCEDURE SupprimerFournisseur(
    IN p_fournisseur_id TINYINT UNSIGNED
)
BEGIN
    -- Supprimer le fournisseur
    DELETE FROM fournisseurs WHERE fournisseur_id = p_fournisseur_id; 
    
END //

DROP PROCEDURE IF EXISTS ProduitsSportSalut //
-- Procédure récupérant les articles de catégorie "Sport" pour le magasin revendeur "SportSalut"
CREATE PROCEDURE ProduitsSportSalut()
BEGIN

    -- Récupere tous les articles de sports
    SELECT produits.produit_nom, description, fournisseurs.fournisseur_nom, status, produits.prix_achat * 1.2 AS prix
    FROM Produits INNER JOIN categories ON categories.categorie_id = produits.categorie_id
    INNER JOIN Fournisseurs ON fournisseurs.fournisseur_id = produits.fournisseur_id
    WHERE categories.categorie_nom = "Sport";
    
END //

DROP PROCEDURE IF EXISTS ProduitsGamEZ //
-- Procédure récupérant les articles de catégorie "Jeux vidéo" ou "Jeux de société" pour le magasin revendeur "GamEZ"
CREATE PROCEDURE ProduitsGamEZ()
BEGIN

    -- Récupere tous les articles de Jeux vidéo et Jeux de société et calcule automatiquement le prix de vente en fonction de la catégorie
    SELECT produits.produit_nom, description, 
    CASE WHEN categories.categorie_nom = "Jeux de société" THEN produits.prix_achat * 1.15
         WHEN categories.categorie_nom = "Jeux vidéo" THEN produits.prix_achat * 1.1
    END AS prix, status, fournisseurs.fournisseur_nom, fournisseurs.date_creation, categories.categorie_nom
    FROM Produits INNER JOIN categories ON categories.categorie_id = produits.categorie_id
    INNER JOIN Fournisseurs ON fournisseurs.fournisseur_id = produits.fournisseur_id
    WHERE categories.categorie_nom = "Jeux vidéo" OR categories.categorie_nom = "Jeux de société";

    
END //

DROP PROCEDURE IF EXISTS ProduitsMEDIDONC //

-- Procédure récupérant les articles de catégorie "Sport" ou "Santé" pour le magasin revendeur "MEDIDONC"
CREATE PROCEDURE ProduitsMEDIDONC()
BEGIN

    -- Récupere tous les articles de sports
    SELECT produits.produit_nom, description, date_modification, status, fournisseurs.fournisseur_id, fournisseurs.fournisseur_nom, fournisseurs.date_creation 
    FROM Produits INNER JOIN categories ON categories.categorie_id = produits.categorie_id
    INNER JOIN Fournisseurs ON fournisseurs.fournisseur_id = produits.fournisseur_id
    WHERE categories.categorie_nom = "Sport" OR categories.categorie_nom = "Santé";
    
END //


DELIMITER ;

REVOKE ALL PRIVILEGES ON sgbdr_g3.* FROM 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.AjouterProduit TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ModifierProduit TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ModifierFournisseur TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.SupprimerFournisseur TO 'admin'@'localhost'; 
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ProduitsSportSalut TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ProduitsGamEZ TO 'admin'@'localhost'; 
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ProduitsMEDIDONC TO 'admin'@'localhost';
GRANT SELECT ON sgbdr_g3.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
