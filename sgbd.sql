CREATE DATABASE sgbdr_g3;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `sgbdr_g3`.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;



-- SET NULL OU --

DROP TABLE IF EXISTS categories;
CREATE TABLE categories
(
    id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    date_creation DateTime NOT NULL
);

DROP TABLE IF EXISTS fournisseurs;
CREATE TABLE fournisseurs
(
    id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nom VARCHAR(100) UNIQUE NOT NULL,
    date_creation DateTime NOT NULL
);

DROP TABLE IF EXISTS produits;
CREATE TABLE produits
(
    id SMALLINT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    category_id TINYINT UNSIGNED NOT NULL,
    fournisseurs_id TINYINT UNISGNED NOT NULL,
    nom VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    prix_achat SMALLINT UNSIGNED NOT NULL,
    status VARCHAR(25) NOT NULL,
    date_creation DATETIME NOT NULL,
    date_modification DATETIME NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (fournisseurs_id) REFERENCES fournisseurs(id) ON DELETE CASCADE
);


-- PROCEDURES

-- Produits

DELIMITER //
    CREATE PROCEDURE CreateProduits(

    )
        BEGIN
        END //
DELIMITER ;

DELIMITER //
    CREATE PROCEDURE ModifierProduits(

    )
        BEGIN
        END //
DELIMITER ;


-- Fournisseurs

DELIMITER //
    CREATE PROCEDURE CreateFournisseurs(

    )
        BEGIN
        END //
DELIMITER ;

DELIMITER //
    CREATE PROCEDURE DeleteFournisseurs(
        IN fournisseurs_id TINYINT
    )
        BEGIN
        END //
DELIMITER ;



-- ALTER TABLE produits ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id);

-- DROIT UTILISATEURS 

REVOKE ALL PRIVILEGES ON sgbdr_g3.* FROM 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.CreateProduits TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.ModifierProduits TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.CreateFournisseurs TO 'admin'@'localhost';
GRANT EXECUTE ON PROCEDURE sgbdr_g3.DeleteFournisseurs TO 'admin'@'localhost';









/*


SELECT JSON_OBJECT('id', 87, 'name', 'carrot');
+-----------------------------------------+
| JSON_OBJECT('id', 87, 'name', 'carrot') |
+-----------------------------------------+
| {"id": 87, "name": "carrot"} 

*/