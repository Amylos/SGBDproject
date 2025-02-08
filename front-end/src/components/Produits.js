import { useState } from 'react';

const Produits = ({ produits, fournisseurs, categories, RecupererProduits }) => {

    console.log('produits : ',produits);

    const [ajouterProduits, setAjouterProduits] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduit, setCurrentProduit] = useState({
        produit_id: '',
        produit_nom: '',
        description: '',
        prix_achat: '',
        status: '',
        categorie_nom: '',
        fournisseur_nom: ''
    });

    const CategorieNom = (categorie_id) => {
        if (!categories) return '';
        const categorie = categories.find(categorie => categorie.categorie_id === categorie_id);
        return categorie ? categorie.categorie_nom : '';
    };

    const FournisseurNom = (fournisseur_id) => {
        if (!fournisseurs) return '';
        const fournisseur = fournisseurs.find(fournisseur => fournisseur.fournisseur_id === fournisseur_id);
        return fournisseur ? fournisseur.fournisseur_nom : '';
    };

    const CommencerEdition = (produit) => {
        setIsEditing(true);
        setCurrentProduit({
            produit_id: produit.produit_id,
            produit_nom: produit.produit_nom,
            description: produit.description,
            prix_achat: produit.prix_achat,
            status: produit.status,
            categorie_nom: produit.categorie_nom,
            fournisseur_nom: produit.fournisseur_nom
        });
    };

    const AnnulerEdition = () => {
        setIsEditing(false);
    };

    const Changement = (e) => {
        const { name, value } = e.target;
        setCurrentProduit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const ModifierProduit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/produits/${currentProduit.produit_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: currentProduit.produit_nom,
                    description: currentProduit.description,
                    prix_achat: currentProduit.prix_achat,
                    status: currentProduit.status,
                    categorie_nom: currentProduit.categorie_nom,
                    fournisseur_nom: currentProduit.fournisseur_nom
                })
            });
            const data = await response.json();
            console.log("Produit modifié :", data);
            RecupererProduits();
            setIsEditing(false);
        } catch (err) {
            console.error("Erreur lors de la modification du produit :", err);
        }
    };

    return (
        <div className="Produits">
            {
                produits ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Prix</th>
                                <th>Status</th>
                                <th>Catégorie</th>
                                <th>Fournisseur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produits.map((produit) => (
                                <tr key={produit.produit_id}>
                                    <td>{produit.produit_id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="produit_nom"
                                            value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.produit_nom : produit.produit_nom}
                                            onChange={Changement}
                                            disabled={!isEditing || currentProduit.produit_id !== produit.produit_id}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.description : produit.description}
                                            onChange={Changement}
                                            disabled={!isEditing || currentProduit.produit_id !== produit.produit_id}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="prix_achat"
                                            value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.prix_achat : produit.prix_achat}
                                            onChange={Changement}
                                            disabled={!isEditing || currentProduit.produit_id !== produit.produit_id}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="status"
                                            value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.status : produit.status}
                                            onChange={Changement}
                                            disabled={!isEditing || currentProduit.produit_id !== produit.produit_id}
                                        >
                                            <option value="Disponible">Disponible</option>
                                            <option value="En rupture">En rupture</option>
                                        </select>
                                    </td>
                                    <td>
                                        {
                                            categories ?
                                            <select
                                                name="categorie_nom"
                                                value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.categorie_nom : CategorieNom(produit.categorie_id)}
                                                onChange={Changement}
                                                disabled={!isEditing ||currentProduit.produit_id !== produit.produit_id}>
                                                {
                                                    categories.map(categorie => (
                                                        <option key={categorie.categorie_id} value={categorie.categorie_nom}>
                                                            {categorie.categorie_nom}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            :
                                            null
                                        }
                                    </td>
                                    <td>
                                        {
                                            fournisseurs ?
                                                <select
                                                    name="fournisseur_nom"
                                                    value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.fournisseur_nom : FournisseurNom(produit.fournisseur_id)}
                                                    onChange={Changement}
                                                    disabled={!isEditing ||currentProduit.produit_id !== produit.produit_id}>
                                                    {fournisseurs.map(fournisseur => (
                                                        <option key={fournisseur.fournisseur_id} value={fournisseur.fournisseur_nom}>
                                                            {fournisseur.fournisseur_nom}
                                                        </option>
                                                    ))}
                                                </select>
                                            :
                                            null
                                        }
                                    </td>
                                    <td>
                                        {isEditing && currentProduit.produit_id === produit.produit_id ? (
                                            <>
                                                <button onClick={ModifierProduit}>Sauvegarder</button>
                                                <button onClick={AnnulerEdition}>Annuler</button>
                                            </>
                                        ) : (
                                            <button onClick={() => CommencerEdition(produit)}>Modifier</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            ) : null
            }

        <button onClick={() =>{ setAjouterProduits(true)}}>Ajouter un produit</button>
        {
            ajouterProduits === true ?
                <AjouterProduitComposant fournisseurs = {fournisseurs} categories = {categories} setAjouterProduits={setAjouterProduits} RecupererProduits = {RecupererProduits}/>
            : null
        }
        </div>
    );
};

export default Produits;



const AjouterProduitComposant = (props) => {
    const { fournisseurs,categories, setAjouterProduits, RecupererProduits } = props;

    const [nouveauProduit, setNouveauProduit] = useState({
        nom: "",
        description: "",
        prix_achat: 0,
        status: "Disponible",
        categorie_nom: "",
        fournisseur_nom: ""
    });

    const Changement = (e) => {
        setNouveauProduit({
            ...nouveauProduit,
            [e.target.name]: e.target.value
        });
    };

    async function AjouterProduits() {
        try {
            const response = await fetch('http://localhost:3000/produits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nouveauProduit)
            });

            const data = await response.json();
            console.log("Produit ajouté avec succès :", data);
            RecupererProduits(); // On met à jour la liste des produits
        }
        catch (err) {
            console.error("Erreur lors de l'ajout du produit :", err);
        }
        setAjouterProduits(false);
    }

    return (
        <div className='AjouterProduitComposant'>
            <input type="text" name="nom" value={nouveauProduit.nom} onChange={Changement} placeholder="Nom du produit"/>
            <input  type="text" name="description" value={nouveauProduit.description} onChange={Changement} placeholder="Description"/>
            <input type="number" name="prix_achat" value={nouveauProduit.prix_achat} onChange={Changement} placeholder="Prix d'achat"/>
            <select name="status" value={nouveauProduit.status} onChange={Changement}>
                <option value="Disponible">Disponible</option>
                <option value="En rupture">En rupture</option>
            </select>
            <select
                name="categorie_nom"
                value={nouveauProduit.categorie_nom}
                onChange={Changement}>
                {
                    categories.map(categorie => (
                        <option key={categorie.categorie_id} value={categorie.categorie_nom}>
                            {categorie.categorie_nom}
                        </option>
                    ))
                }
            </select>
            <select
                name="fournisseur_nom"
                value={nouveauProduit.fournisseur_nom}
                onChange={Changement}>
                {
                    fournisseurs.map(fournisseur => (
                        <option key={fournisseur.fournisseur_id} value={fournisseur.fournisseur_nom}>
                            {fournisseur.fournisseur_nom}
                        </option>
                    ))
                }
            </select>
            <button onClick={()=>{AjouterProduits()}}>Valider</button>
        </div>
    );
};

