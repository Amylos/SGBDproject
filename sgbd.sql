CREATE DATABASE sgbdr_g3;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON 'sgbdr_g3'.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE sgbdr_g3;

DROP TABLE IF EXISTS produits;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories
(
    categorie_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nom VARCHAR(255) UNIQUE NOT NULL,
    date_creation DATETIME NOT NULL
);

DROP TABLE IF EXISTS fournisseurs;
CREATE TABLE fournisseurs
(
    fournisseurs_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nom VARCHAR(255) UNIQUE NOT NULL,
    date_creation DATETIME NOT NULL
);

CREATE TABLE produits
(
    produit_id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    categorie_id TINYINT UNSIGNED NOT NULL,
    fournisseurs_id TINYINT UNSIGNED NOT NULL,
    nom VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    prix_achat SMALLINT UNSIGNED NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'disponible',
    date_creation DATETIME NOT NULL,
    date_modification DATETIME NOT NULL,
    FOREIGN KEY (categorie_id) REFERENCES categories(categorie_id) ON DELETE CASCADE,
    FOREIGN KEY (fournisseurs_id) REFERENCES fournisseurs(fournisseurs_id) ON DELETE CASCADE
); 

DELIMITER //

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
    SELECT categorie_id INTO v_categorie_id FROM categories WHERE categories.nom = p_categorie_nom;

    -- Si la catégorie n'existe pas, la créer
    IF v_categorie_id IS NULL THEN
        INSERT INTO categories (nom, date_creation) 
        VALUES (p_categorie_nom, v_now);
        SET v_categorie_id = LAST_INSERT_ID();
    END IF;

    -- Vérifier si le fournisseur existe déjà
    SELECT fournisseurs_id INTO v_fournisseur_id FROM fournisseurs WHERE fournisseurs.nom = p_fournisseur_nom;

    -- Si le fournisseur n'existe pas, le créer
    IF v_fournisseur_id IS NULL THEN
        INSERT INTO fournisseurs (nom, date_creation) 
        VALUES (p_fournisseur_nom, v_now);
        SET v_fournisseur_id = LAST_INSERT_ID();
    END IF;

    -- IF p_status != "disponible" || p_status != "en rupture" THEN
    --     SET p_status = "disponible";
    -- END IF;

    -- Insérer le produit avec la catégorie et le fournisseur
    INSERT INTO produits (nom, description, prix_achat, status, categorie_id, fournisseurs_id, date_creation, date_modification)
    VALUES (p_nom, p_description, p_prix_achat, p_status, v_categorie_id, v_fournisseur_id, v_now, v_now);
    
END //

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
    SELECT categorie_id INTO v_categorie_id FROM categories WHERE categories.nom = p_categorie_nom;

    -- Si la catégorie n'existe pas, la créer
    IF v_categorie_id IS NULL THEN
        INSERT INTO categories (nom, date_creation) 
        VALUES (p_categorie_nom, v_now);
        SET v_categorie_id = LAST_INSERT_ID();
    END IF;

    -- Vérifier si le fournisseur existe déjà
    SELECT fournisseurs_id INTO v_fournisseur_id FROM fournisseurs WHERE fournisseurs.nom = p_fournisseur_nom;

    -- Si le fournisseur n'existe pas, le créer
    IF v_fournisseur_id IS NULL THEN
        INSERT INTO fournisseurs (nom, date_creation) 
        VALUES (p_fournisseur_nom, v_now);
        SET v_fournisseur_id = LAST_INSERT_ID();
    END IF;

    -- Mettre à jour le produit avec la catégorie et le fournisseur
    UPDATE produits
    SET nom = p_nom,
        description = p_description,
        prix_achat = p_prix_achat,
        status = p_status,
        categorie_id = v_categorie_id,
        fournisseurs_id = v_fournisseur_id,
        date_modification = v_now
    WHERE produit_id = p_produit_id;
    
END //

CREATE PROCEDURE ModifierFournisseur(
    IN p_fournisseurs_id TINYINT UNSIGNED,
    IN p_nom VARCHAR(255)
)
BEGIN
    -- Mettre à jour le fournisseur
    UPDATE fournisseurs SET nom = p_nom WHERE fournisseurs_id = p_fournisseurs_id;
    
END //

CREATE PROCEDURE SupprimerFournisseur(
    IN p_fournisseur_nom VARCHAR(255)
)
BEGIN
    -- Supprimer le fournisseur
    DELETE FROM fournisseurs WHERE nom = p_fournisseur_nom; 
    
END //

DELIMITER ;

-- REVOKE ALL PRIVILEGES ON sgbdr_g3.* FROM 'admin'@'localhost';
-- GRANT EXECUTE ON PROCEDURE sgbdr_g3.AjouterProduit TO 'admin'@'localhost';
-- GRANT EXECUTE ON PROCEDURE sgbdr_g3.ModifierProduit TO 'admin'@'localhost';
-- GRANT EXECUTE ON PROCEDURE sgbdr_g3.ModifierFournisseur TO 'admin'@'localhost';
-- GRANT EXECUTE ON PROCEDURE sgbdr_g3.SupprimerFournisseur TO 'admin'@'localhost'; 
-- FLUSH PRIVILEGES;
