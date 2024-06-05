import React, { Fragment } from 'react'
import './Home.css'
import { CgMouse } from "react-icons/cg";

function Home() {
  return (
    <Fragment>
        <div className="banner">
            <h4>Welcome To Virtual Mall</h4>
            <h1> FIND AMAZING PRODUCTS BELOW </h1>

            <a href="#"><button>Scroll<CgMouse/></button></a>
        </div>
        <h2 className='HomeHeading'>Featured Products</h2>
    </Fragment>
    
  )
}

export default Home