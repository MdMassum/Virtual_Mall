import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
   <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#">Virtual Mall</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="btn-group mx-5">
        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Profile
        </button>
        <ul className="dropdown-menu">
          <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
          <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
          <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
          <li><NavLink className="dropdown-item" to="#">Separated link</NavLink></li>
        </ul>
      </div>
    </nav>
   </>
  )
}

export default Header