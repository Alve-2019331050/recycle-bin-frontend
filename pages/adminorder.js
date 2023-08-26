import Layout from '@/components/Layout'
import React, { useState, useEffect } from 'react'

const adminorder = () => {

    const [orders, setOrders] = useState([]);
    // Fetch orders of all users
    useEffect(() => {
        fetchOrders();
    }, []);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const { data } = await fetch(`http://localhost:8080/api/v1/cart/adminorder`);
            setOrders(data.order);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    return (
        <>
            <Layout>
                <div className='mt-5 ml-10'>
                    <h1><b>Order Dashboard</b></h1>
                </div>

                {/* //table */}

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#Order Id</th>
                            <th scope="col">#User Id</th>
                            <th scope="col">Products(Quantity)</th>
                            <th scope="col">Total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.userId}</td>
                                <td>{/* Bring product and quantity here */}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>


            </Layout>
        </>
    )
}

export default adminorder
