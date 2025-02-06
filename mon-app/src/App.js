import React from "react";
import "./App.css";

function App() {
  return (
    // Choix de les options //
    <div>
      <h1 className="title">
        <span>SGBDR - système central -</span>
      </h1>
      <div className="btn-content">
        <div className="btn-box">
          <div className="btn">
            <a href="fournisseurs" className="link">
              Fournisseurs
            </a>
          </div>
        </div>
        <div className="btn-box">
          <div className="btn">
            <a href="/categories" className="link">
              Categories
            </a>
          </div>
        </div>
        <div className="btn-box">
          <div className="btn">
            <a href="produits" className="link">
              Produit
            </a>
          </div>
        </div>
      </div>
      <div>
        <div className="liste-content">
          <table class="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Statut</th>
                <th>Categorie</th>
                <th>Fournisseur</th>
                <th>Modifier</th>
                <th>Afficher</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Jhon</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input type="checkbox" id="checkbox-id" />
                </td>
                <td>
                  <input type="checkbox" id="checkbox-id" />
                </td>
              </tr>
              <tr class="active-row">
                <td>002</td>
                <td>Sara</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input type="checkbox" id="checkbox-id" />
                </td>
                <td>
                  <input type="checkbox" id="checkbox-id" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
