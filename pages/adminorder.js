import Layout from '@/components/Layout'
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const adminorder = () => {

    const [orders, setOrders] = useState([]);
    // Fetch orders of all users


    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/cart/adminorder`);
            console.log(data);
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <>
            <Layout>
                <div className='mt-5 ml-10'>
                    <h1><b>Order Dashboard</b></h1>
                </div>

                {/* //table */}

                <table className="table mt-5 shadow-2xl table-hover table-border">
                    <thead>
                        <tr>
                            <th scope="col">#Order Id</th>
                            <th scope="col">#User Id</th>
                            <th scope="col">Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{order.orderId}</td>
                                    <td>{order.u_id}</td>
                                    <td>{order.name}</td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>


            </Layout>
        </>
    )
}

export default adminorder
