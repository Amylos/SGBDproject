-- CATEGORIES

INSERT INTO categories (categorie_nom, date_creation) VALUES 
('Jeux vidéo', NOW()),
('Sport', NOW()),
('Santé', NOW());


-- FOURNISSEURS

INSERT INTO fournisseurs (fournisseur_nom, date_creation) VALUES 
('Fournisseur A', NOW()),
('Fournisseur B', NOW()),
('Fournisseur C', NOW()),
('Fournisseur D', NOW()),
('Fournisseur E', NOW()),
('Fournisseur F', NOW()),
('Fournisseur G', NOW()),
('Fournisseur H', NOW()),
('Fournisseur I', NOW()),
('Fournisseur J', NOW());


-- PRODUITS


INSERT INTO produits (produit_nom, description, prix_achat, status, categorie_id, fournisseur_id, date_creation, date_modification) VALUES
('Console de jeux XYZ', 'Console de jeux dernier cri avec des fonctionnalités avancées.', 500, 'disponible', 1, 1, NOW(), NOW()),
('Manette de Jeu', 'Manette sans fil pour des sessions de jeu confortables.', 50.50, 'disponible', 1, 2, NOW(), NOW()),
('Chaussures de Foot', 'Chaussures de football professionnelles pour terrains synthétiques.', 100.99, 'disponible', 2, 3, NOW(), NOW()),
('Ballon de Basket', 'Ballon de basket en caoutchouc durable pour entraînements.', 30.99, 'disponible', 2, 4, NOW(), NOW()),
('Vitamines C', 'Complément alimentaire pour renforcer le système immunitaire.', 15, 'disponible', 3, 5, NOW(), NOW()),
('Crème Anti-Douleur', 'Crème apaisante pour les douleurs musculaires.', 12, 'disponible', 3, 6, NOW(), NOW()),
('Jeu de Football', 'Jeu vidéo de simulation de football avec des graphismes réalistes.', 60, 'disponible', 1, 7, NOW(), NOW()),
('Tapis de Course', 'Tapis de course pour un entraînement à domicile.', 299.99, 'disponible', 2, 8, NOW(), NOW()),
('Complément Protéiné', 'Protéines en poudre pour la prise de masse musculaire.', 40, 'disponible', 3, 9, NOW(), NOW()),
('Sac de Sport', 'Sac robuste pour transporter tout le nécessaire pour le sport.', 20.99, 'disponible', 2, 10, NOW(), NOW());

UPDATE produits SET prix_achat = 25.99, date_modification = NOW() WHERE produit_nom = 'Sac de Sport';