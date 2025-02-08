import React from 'react'
import { useEffect } from 'react'


const Categories = (props) => {
    const {categories} = props;
    console.log('Catégories : ', categories);

    return (
        <div>
            {
                categories ?
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom Categorie</th>
                                <th>Date de création</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((categorie, index) => (
                                    <tr key={index}>
                                        <td>
                                            {categorie.categorie_id}
                                        </td>
                                        <td>
                                            {categorie.categorie_nom}
                                        </td>
                                        <td>
                                            {categorie.date_creation.split("T")[0]}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                :
                null
            }
        </div>
    )
}

export default Categories
