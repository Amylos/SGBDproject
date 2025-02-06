import './App.css';
import Categories from './components/Categories';
import Accueil from './components/Accueil';
import Produits from './components/Produits';
import Fournisseurs from './components/Fournisseurs';


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/fournisseurs" element={<Fournisseurs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
