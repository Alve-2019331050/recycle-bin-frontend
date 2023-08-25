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

    //function to handle status change
    const handleStatusChange = async (e, productId) => {
        const newStatus = e.target.value;
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/admin/updateProductStatus/${productId}`, {
                status: newStatus
            });
            console.log(res);

            if (res.data.success) {
                //console.log("HI");
                //update status in frontend
                const updatedProducts = pendingProducts.map((product) =>
                    product.p_id === productId ? { ...product, status: newStatus } : product
                );
                setPendingProducts(updatedProducts);
                toast.success('Product status updated successfully.');
            } else {
                toast.error('Failed to update product status.');
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in updating product status');
        }
    }


    //useEffect hook
    useEffect(() => {
        getPendingProducts();
    }, []);

    // In order to bring 4 products in one row
    const rowProducts = [];
    for (let i = 0; i < pendingProducts.length; i += 4) {
        rowProducts.push(pendingProducts.slice(i, i + 4));
    }

    return (
        <Layout>
            {rowProducts.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((product, index) => (
                        <div key={index} className="col-md-3">
                            <div className="shadow border-gray-600 card mt-4 hover:scale-105 transition-all ease-in-out duration-500 cursor-pointer" style={{ width: '300px', height: '500px' }}>
                                <img src={`http://localhost:8080/${product.photo}`} alt={product.name} className="h-[290px] w-[290px] object-cover m-1" />
                                <div className="card-body">
                                    <h4 className="card-title text-center mt-1">
                                        {product.name}
                                    </h4>
                                    <p className="card-text text-center mt-1">
                                        <b>Price : <span className="text-pink-800">Tk. {product.price}</span></b>
                                    </p>
                                    <p className="card-text text-center mt-1">
                                        <u>Description</u> : <span className="text-pink-800">{product.description}</span>
                                    </p>
                                    <br />
                                    <h6><b>Status : </b></h6>
                                    <select className="product-status ml-20 border"
                                        onChange={(e) => handleStatusChange(e, product.p_id)}
                                        value={product.status}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Declined">Declined</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Layout>
    );


}

export default Admin