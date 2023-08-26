/* eslint-disable react-hooks/rules-of-hooks */
import Layout from '@/components/Layout';
import { useAuth } from '@/context/auth';
import axios from 'axios';
import { useEffect, useState } from 'react';


const userOrder = () => {
    //variables and setter function
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    useEffect(() => {
        // Fetch order
        async function fetchOrders() {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/cart/userorder/${auth.user.u_id}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();
    }, []);

    return (
        <>
            <Layout>
                <div className='mt-5 ml-10'>
                    <h1><b>Order History</b></h1>
                </div>

                {/* //table */}

                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#Order Id</th>
                            <th scope="col">Products</th>
                            <th scope="col">Total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/** Map order to table */}
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <th scope="row">{order.orderId}</th>
                                <td>
                                    {/** Map products to table */}
                                    {order.products.map((product, index) => (
                                        <div key={index}>
                                            {product.name} 
                                        </div>
                                    ))}
                                </td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </Layout >

        </>
    )
}

export default userOrder

