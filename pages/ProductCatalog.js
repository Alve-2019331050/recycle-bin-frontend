import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import React from 'react'


const ProductCatalog = () => {
    return (
        <Layout>
            <div class="row">
                {/**left column to contain search bar and product types */}
                <div class='col-lg-4'>
                    <div class='row'>
                        {/** search bar */}
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder='Search'></input>
                            <button class="btn btn-primary hover:brightness-300">Search</button>
                        </div>
                    </div>
                    <div class="row">
                        {/** bring product types here */}
                        <h6 class="mb-3"><b>Product Categories</b></h6>
                        <div class="form-check px-5">
                            <input class="form-check-input" type="checkbox" value="" id="allProduct" checked/>
                                <label class="form-check-label" for="allProduct">
                                    All Products
                                </label>
                        </div>
                        <div class="form-check px-5">
                            <input class="form-check-input" type="checkbox" value="" id="otherProduct"/>
                                <label class="form-check-label" for="otherProduct">
                                    Other Products
                                </label>
                        </div>
                    </div>
                    <div class="row">
                        {/** bring product price range here */}
                        <h6 class="mb-3"><b>Product Categories</b></h6>
                        <div class="form-check px-5">
                            <input class="form-check-input" type="checkbox" value="" id="allPrice" checked/>
                                <label class="form-check-label" for="allPrice">
                                    All 
                                </label>
                        </div>
                        <div class="form-check px-5">
                            <input class="form-check-input" type="checkbox" value="" id="otherPrice"/>
                                <label class="form-check-label" for="otherPrice">
                                    Other Price Ranges
                                </label>
                        </div>
                    </div>
                </div>
                <div class='col-lg-8'>
                    {/** Bring product catalogue here */}
                    {/* <ProductCard></ProductCard>  */}
                    <div class="card" style={{ width: '400px' }}>
                        <img src="/1.jpg" alt="1" />
                        <div class="card-body">
                            <h4 class="card-title">
                                product name
                            </h4>
                            <p class="card-text">
                                product price
                            </p>
                            <button class="btn mx-32" style={{backgroundColor: 'orange'}}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductCatalog