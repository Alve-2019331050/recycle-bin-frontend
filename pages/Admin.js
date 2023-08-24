import Layout from '@/components/Layout'
import React, { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { toast } from 'react-toastify';


const Admin = () => {
    //variables
    const [pendingProducts, setPendingProducts] = useState([]);

    //function to get and set pending products
    const getPendingProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/admin/getPendingProduct/Pending');
            console.log(data);
            if (data?.success) {
                console.log(data);
                setPendingProducts(data?.product);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting pending products');
        }
    }

    //useEffect hook
    useEffect(() => {
        getPendingProducts();
    }, []);

    return (
        <Layout>
            {
                pendingProducts && pendingProducts.map((product, index) => {
                    return (
                        <div className="shadow border-gray-600 card mt-4 hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer" style={{ width: '300px', height: '500px' }}>
                            <img src={`http://localhost:8080/${product.photo}`} alt={product.name} className="h-[290px] w-[290px] object-cover m-1" />
                            <div class="card-body">
                                <h4 class="card-title text-center mt-1">
                                    {product.name}
                                </h4>
                                <p class="card-text text-center mt-1">
                                    <b>Price : <span className="text-pink-800">Tk. {product.price}</span></b>
                                </p>
                                <p class="card-text text-center mt-1">
                                    <u>Description</u> : <span className="text-pink-800">{product.description}</span>
                                </p>
                                <br />
                                <h6><b>Status : </b></h6>
                                <select className="product-status ml-20 border">
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                        </div>

                    )
                })
            }
        </Layout>
    );

}

{/* <div className="card" style={{ width: '20rem' }}>
            //     <img src="/1.jpg" className="card-img-top" />
            //     <div className="card-body shadow-lg">
            //         <h5 className="card-title">Product Name</h5>
            //         <p className="card-text">Product Price</p><br />
            //         <p className="card-text">Product Description</p><br />
            //         <h6><b>Status : </b></h6>
            //         <select className="product-status ml-20 border">
            //             <option value="pending">Pending</option>
            //             <option value="approved">Approved</option>
            //             <option value="declined">Declined</option>
            //         </select>
            //     </div>
            // </div> */}

export default Admin