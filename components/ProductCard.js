import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div class="card" style={{width:'400px'}}>
        <img src={product.image} alt = {product.name}/>
        <div class="card-body">
            <h4 class="card-title">
                {product.name}
            </h4>
            <p class="card-text">
                {product.price}
            </p>
            <button class="btn mx-32" style={{backgroundColor: 'orange'}}>Add to cart</button>
        </div>
    </div>
    
  )
}

export default ProductCard