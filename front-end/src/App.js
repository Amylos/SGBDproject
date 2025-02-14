import React from 'react';
import './App.css';
import { useState,useEffect } from 'react';

import Produits from './components/Produits'
import Fournisseurs from './components/Fournisseurs'
import Categories from './components/Categories'


function App() {

    const [currentPanel, setCurrentPanel] = useState('produits');
    const [produits, setProduits] = useState(null);
    const [fournisseurs, setFournisseurs] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(()=>{
        RecupererProduits();
        RecupererFournisseurs();
        RecupererCategories();
    },[]);

    async function RecupererProduits() { // Récupération des produits dans la BDD MySQL
        try {
            const response = await fetch('http://localhost:3000/produits', {
                method: 'GET',
            });
            const data = await response.json();
            console.log('récuperer produit : ', data);
            setProduits(data);
        }
        catch (err) {
            console.error(err);
        }
    }

   async function RecupererFournisseurs() {// Récupération des fournisseurs dans la BDD MySQL
        try {
            const response = await fetch('http://localhost:3000/fournisseurs', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            setFournisseurs(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function RecupererCategories() { // Récupération des catégories dans la BDD MySQL
        try {
            const response = await fetch('http://localhost:3000/categories', {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            setCategories(data);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='App'>
            <nav className='Nav'>
                <h1>Système central</h1>
                <button onClick={() =>{setCurrentPanel('produits')}} className='button'>Produits</button>
                <button onClick={() =>{setCurrentPanel('fournisseurs')}} className='button'>Fournisseurs</button>
                <button onClick={() =>{setCurrentPanel('categories')}} className='button'>Catégories</button>
            </nav>
            <div>
                {
                    currentPanel === 'produits' ?
                    <Produits produits = {produits} fournisseurs = {fournisseurs} categories = {categories} RecupererProduits = {RecupererProduits}/>
                    :
                    currentPanel === 'fournisseurs' ?
                    <Fournisseurs fournisseurs = {fournisseurs} RecupererFournisseurs = {RecupererFournisseurs}/>
                    :
                    currentPanel === 'categories' ?
                    <Categories categories = {categories}/>
                    :
                    null
                }
            </div>
        </div>
    );
}

    export default App;