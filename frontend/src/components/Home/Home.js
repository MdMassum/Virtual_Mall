import React, { Fragment } from 'react'
import './Home.css'
import { CgMouse } from "react-icons/cg";
import Product from './Product';
import imgurl from '../../images/camera 2.jpg'
import MetaData from '../layout/MetaData';

const product = {
  name:"Dress",
  price:"₹78900",
  _id:"djflkjflk",
  images:[{url:imgurl},]
}
function Home() {
  return (
    <Fragment>
        <MetaData title="Virtual Mall" />
        <div className="banner">
            <h4>Welcome To Virtual Mall</h4>
            <h1> FIND AMAZING PRODUCTS BELOW </h1>

            <a href="#cont"><button>Scroll<CgMouse/></button></a>
        </div>
        <h2 className='HomeHeading'>Featured Products</h2>

        <div className="cont" id='cont'>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
          <Product product = {product}/>
        </div>
        
    </Fragment>
    
  )
}

export default Home