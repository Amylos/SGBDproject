import React from 'react'
import { Link } from 'react-router-dom'

const Accueil = () => {
  return (
    <div>
      <h1><span>SGBDR - système central -</span></h1>
      <div className="btn-content">
        <div className="btn-box">
          <div className="btn">
            <Link to="/categories" className='link'>Categories</Link>
          </div>
        </div>
        <div className="btn-box">
          <div className="btn">
            <Link to="/produits" className='link'>Produits</Link>
          </div>
        </div>
        <div className="btn-box">
          <div className="btn">
            <Link to="/fournisseurs" className='link'>Fournisseurs</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accueil
