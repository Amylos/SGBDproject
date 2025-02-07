import { useState } from 'react';

const Produits = ({ produits, fournisseurs, categories, RecupererProduits }) => {
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
        const fournisseur = fournisseurs.find(fournisseur => fournisseur.fournisseurs_id === fournisseur_id);
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
            categorie_nom: CategorieNom(produit.categorie_id),
            fournisseur_nom: FournisseurNom(produit.fournisseurs_id)
        });
    };

    // Annuler l'édition
    const AnnulerEdition = () => {
        setIsEditing(false);
    };

    // Gérer les changements dans les inputs
    const Changement = (e) => {
        const { name, value } = e.target;
        setCurrentProduit(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Modifier le produit en envoyant les noms
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
            console.log("Produit modifié avec succès :", data);
            RecupererProduits();
            setIsEditing(false);
        } catch (err) {
            console.error("Erreur lors de la modification du produit :", err);
        }
    };

    return (
        <div className="Produits">
            {produits ? (
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
                            <th>Actions</th>
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
                                        disabled={!isEditing}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="description"
                                        value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.description : produit.description}
                                        onChange={Changement}
                                        disabled={!isEditing}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        name="prix_achat"
                                        value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.prix_achat : produit.prix_achat}
                                        onChange={Changement}
                                        disabled={!isEditing}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="status"
                                        value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.status : produit.status}
                                        onChange={Changement}
                                        disabled={!isEditing}
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
                                            disabled={!isEditing}>
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
                                                value={isEditing && currentProduit.produit_id === produit.produit_id ? currentProduit.fournisseur_nom : FournisseurNom(produit.fournisseurs_id)}
                                                onChange={Changement}
                                                disabled={!isEditing}>
                                                {fournisseurs.map(fournisseur => (
                                                    <option key={fournisseur.fournisseurs_id} value={fournisseur.fournisseur_nom}>
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
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default Produits;



    // const [ajouterProduits, setAjouterProduits] = useState(false);

  {/* <button onClick={() =>{ setAjouterProduits(true)}}>Ajouter un produit</button> */}
        {/* {
            ajouterProduits === true ?
                <AjouterProduitComposant fournisseurs = {fournisseurs} categories = {categories} setAjouterProduits={setAjouterProduits}/>
            : null
        } */}

const AjouterProduitComposant = (props) => {
    const { fournisseurs,categories, setAjouterProduits } = props;
    
    const [nouveauProduit, setNouveauProduit] = useState({
        nom: "",
        description: "",
        prix_achat: 0,
        status: "Disponible",
        categorie_nom: "",
        fournisseur_nom: ""
    });

    // Fonction pour gérer les changements d'input
    const handleChange = (e) => {
        setNouveauProduit({
            ...nouveauProduit,
            [e.target.name]: e.target.value
        });
    };

    // Fonction pour ajouter un produit
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
        }
        catch (err) {
            console.error("Erreur lors de l'ajout du produit :", err);
        }
        setAjouterProduits(false);
    }

    return (
        <div className='AjouterProduitComposant'>
            <div className="inputs-container">
                <input type="text" name="nom" value={nouveauProduit.nom} onChange={handleChange} placeholder="Nom du produit"/>
                <input  type="text" name="description" value={nouveauProduit.description} onChange={handleChange} placeholder="Description"/>
                <input type="number" name="prix_achat" value={nouveauProduit.prix_achat} onChange={handleChange} placeholder="Prix d'achat"/>
                <select name="status" value={nouveauProduit.status} onChange={handleChange}>
                    <option value="Disponible">Disponible</option>
                    <option value="En rupture">En rupture</option>
                </select>
                <select name="categorie_nom"  onChange={handleChange}>
                    {
                        categories.map((categorie)=>(
                            <option value={categorie.categorie_nom}>{categorie.categorie_nom}</option>
                        ))
                    }
                </select>
                <select name="fournisseur_nom"  onChange={handleChange}>
                    {
                        fournisseurs.map((fournisseur)=>(
                            <option value={fournisseur.fournisseur_nom}>{fournisseur.fournisseur_nom}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={()=>{AjouterProduits()}}>Ajouter le produit</button>
        </div>
    );
};



// const ModifierProduitComposant = (props) => {
//     const { produit, setModifierProduits } = props;

//     const [editedProduit, setEditedProduit] = useState({
//         nom: produit.produit_nom,
//         description: produit.description,
//         prix_achat: produit.prix_achat || 0,
//         status: produit.status,
//         categorie_nom: produit.categorie_nom || "",
//         fournisseur_nom: produit.fournisseur_nom || ""
//     });

//     const handleChange = (e) => {
//         setEditedProduit({
//             ...editedProduit,
//             [e.target.name]: e.target.value
//         });
//     };

//     async function ModifierProduits() {
//         try {
//             const response = await fetch(`http://localhost:3000/produits/${produit.produit_id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(editedProduit)
//             });

//             const data = await response.json();
//             console.log("Produit modifié avec succès :", data);
//         }
//         catch (err) {
//             console.error("Erreur lors de la modification du produit :", err);
//         }
//         setModifierProduits(false);
//     }

//     return (
//         <div className='ModifierProduitComposant'>
//             <input
//                 type="text"
//                 name="nom"
//                 value={editedProduit.nom}
//                 onChange={handleChange}
//                 placeholder="Nom du produit"
//             />
//             <input
//                 type="text"
//                 name="description"
//                 value={editedProduit.description}
//                 onChange={handleChange}
//                 placeholder="Description"
//             />
//             <input
//                 type="number"
//                 name="prix_achat"
//                 value={editedProduit.prix_achat}
//                 onChange={handleChange}
//                 placeholder="Prix d'achat"
//             />
//             <select
//                 name="status"
//                 value={editedProduit.status}
//                 onChange={handleChange}
//             >
//                 <option value="Disponible">Disponible</option>
//                 <option value="En rupture">En rupture</option>
//             </select>
//             <input
//                 type="text"
//                 name="categorie_nom"
//                 value={editedProduit.categorie_nom}
//                 onChange={handleChange}
//                 placeholder="Catégorie"
//             />
//             <input
//                 type="text"
//                 name="fournisseur_nom"
//                 value={editedProduit.fournisseur_nom}
//                 onChange={handleChange}
//                 placeholder="Fournisseur"
//             />
//             <button onClick={ModifierProduits}>Valider</button>
//         </div>
//     );
// };
