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
                    // console.log(response.data.data);
                    setOrders(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();
    }, []);
    console.log(orders);

    return (
        <>
            <Layout>
                <div className='mt-5 ml-10'>
                    <h1><b>Order History</b></h1>
                </div>

                {/* table */}

                <table className="table mt-5 shadow-2xl table-hover table-border">
                    <thead>
                        <tr>
                            <th>#Order Id</th>
                            <th>Products</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/** Map order to table */}
                        {
                            orders && orders.map((item, index) => {
                                console.log(item.name);
                                return (<tr key={index}>
                                    <td>{item.orderId}</td>
                                    <td>{item.name}</td>
                                </tr>)
                            })
                        }

                    </tbody>
                </table>

            </Layout >

        </>
    )
}

export default userOrder

