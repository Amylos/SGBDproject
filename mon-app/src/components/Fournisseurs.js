import { useState } from 'react';

const Fournisseurs = (props) => {
    const { fournisseurs,RecupererFournisseurs } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [currentFournisseur, setCurrentFournisseur] = useState({
        fournisseurs_id: '',
        fournisseur_nom: ''
    });

    const CommencerEdition = (fournisseur) => {
        setIsEditing(true); // Passe en mode édition
        setCurrentFournisseur({
            fournisseurs_id: fournisseur.fournisseurs_id,
            fournisseur_nom: fournisseur.fournisseur_nom
        });
    };

    const AnnulerEdition = () => {
        setIsEditing(false);
    };

    const ModifierFournisseur = async () => {
            try {
                const response = await fetch(`http://localhost:3000/fournisseurs/${currentFournisseur.fournisseurs_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nom: currentFournisseur.fournisseur_nom,
                    })
                });
                const data = await response.json();
                console.log("Fournisseur modifié avec succès :", data);
                RecupererFournisseurs();
            }
            catch (err) {
                console.error("Erreur lors de la modification du fournisseur :", err);
            }
            setIsEditing(false);
    };

    const SupprimerFournisseur = async(fournisseur_id) => {
        try {
            const response = await fetch(`http://localhost:3000/fournisseurs/${fournisseur_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log("Fournisseur supprimé avec succès :", data);
            RecupererFournisseurs();
        }
        catch (err) {
            console.error("Erreur lors de la modification du fournisseur :", err);
        }
    };

    const Changement = (e) => {
        const { name, value } = e.target;
        setCurrentFournisseur({
            ...currentFournisseur,
            [name]: value
        });
    };

    return (
        <div className="Fournisseurs">
            {fournisseurs ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom Fournisseur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs.map((fournisseur, index) => (
                            <tr key={index}>
                                <td>
                                {fournisseur.fournisseurs_id}
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="fournisseur_nom"
                                        value={isEditing && currentFournisseur.fournisseurs_id === fournisseur.fournisseurs_id ? currentFournisseur.fournisseur_nom : fournisseur.fournisseur_nom}
                                        onChange={Changement}
                                        disabled={!isEditing || currentFournisseur.fournisseur_id !== fournisseur.fournisseur_id}
                                    />
                                </td>
                                <td>
                                    {isEditing && currentFournisseur.fournisseur_id === fournisseur.fournisseur_id ? (
                                        <>
                                            <button onClick={() => {ModifierFournisseur()}}>Sauvegarder</button>
                                            <button onClick={() => {AnnulerEdition()}}>Annuler</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => CommencerEdition(fournisseur)}>Modifier</button>
                                            <button onClick={() => SupprimerFournisseur(fournisseur.fournisseurs_id)}>Supprimer</button>
                                        </>
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

export default Fournisseurs;
