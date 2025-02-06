import React from 'react';
import './App.css';


function App() {
  return (
      <div>
        <h1><span>SGBDR - système central -</span></h1>
        <div className="btn-content">
          <div className="btn-box">
            <div className="btn">
            <a href="/categories" className="link">Categories</a>
            </div>
          </div>
          <div className="btn-box">
            <div className="btn">
            <a href="produits" className="link">Produit</a>
            </div>
          </div>
          <div className="btn-box">
            <div className="btn">
            <a href="fournisseurs" className="link">Fournisseurs</a>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;