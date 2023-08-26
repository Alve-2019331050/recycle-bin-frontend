import Layout from "@/components/Layout";
import { useStore } from "@/context/Store";
import { useAuth } from "@/context/auth";
import axios from "axios";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

function Cart() {
    const [cartItems, setCartItems] = useStore();
    const [auth] = useAuth();

    const getCartItems = async () => {
        const { data } = await axios.get(`http://localhost:8080/api/v1/cart/getItems?b_id=${auth.user.u_id}`);
        if (data?.success) {
            const object = [];
            data.product.forEach((product, index) => {
                object.push({
                    product,
                    quantity: data.quantity[index]
                })
            })
            setCartItems(object);
        }
    };

    async function removeItem(item) {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/cart/remove?p_id=${item.product.p_id}&b_id=${auth.user.u_id}`);
            if (data?.success) {
                getCartItems();
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleCheckOut = async () => {
        try {
            const { data } = axios.put('http://localhost:8080/api/v1/cart/place-order', {
                cartItems,
                u_id: auth.user.u_id,
            });
            const { data: r } = axios.delete(`http://localhost:8080/api/v1/cart/delete/${auth.user.u_id}`);
            getCartItems();
        } catch (error) {
            console.log(error);
            toast.error('Error in creating order');
        }
    }

    return (
        <Layout title="Shopping Cart">
            <div className="mb-1 ml-5 mt-5 text-4xl font-bold text-blue-600">Shopping Cart</div>
            {
                cartItems.length === 0 ? (
                    <div className="flex flex-col h-[60%] w-[100%] fixed items-center justify-center">
                        <span className="text-3xl mb-3">Cart is empty</span>
                        <Link href='/' className="text-xl text-violet-800">Go shopping</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-20">
                        <div className="overflow-x-auto col-span-3 ml-3">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-5 text-left">Item</th>
                                        <th className="p-5 text-right">Quantity</th>
                                        <th className="p-5 text-right">Price</th>
                                        <th className="p-5">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item, index) =>
                                        <tr key={index} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.product.slug}`} className="flex items-center">
                                                    <img src={`http://localhost:8080/${item.product.photo}`} alt={item.product.slug} width={50} height={50} />
                                                    &nbsp;&nbsp;
                                                    {item.product.name}
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">{item.quantity}</td>
                                            <td className="p-5 text-right">Tk. {item.product.price}</td>
                                            <td className="p-5 text-center">
                                                <button onClick={() => removeItem(item)}>
                                                    <AiFillCloseCircle className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="card shadow-lg border-blue-900 border-2 max-h-40 p-5 col-span-1">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a, item) => a + item.quantity, 0)})
                                        {' '}
                                        : Tk. {' '}
                                        {cartItems.reduce((a, item) => a + item.quantity * item.product.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <button className="bg-lime-700 rounded-md ml-14 p-2 text-white hover:bg-lime-600" onClick={handleCheckOut}>Check Out</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}

export default Cart;