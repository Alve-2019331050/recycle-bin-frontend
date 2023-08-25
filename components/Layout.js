import { useStore } from "@/context/Store";
import { useAuth } from "@/context/auth";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, children }) {
    const [auth, setAuth] = useAuth();
    const [cartItems, setCartItems] = useStore();
    const router = useRouter();
    const handleLogout = () => {
        axios.get('http://localhost:8080/api/v1/auth/logout').then((res) => {
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user: null,
                token: ''
            });
            window.localStorage.removeItem('auth');
            router.push('/login');
        }).catch((error) => {
            console.log(error.respose.data.message);
        });
    };

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

    useEffect(() => {
        if (auth.user)
            getCartItems();
    }, [auth.user]);
    // console.log(cartItems);

    return (
        <>
            <Head>
                <title>{title ? title + ' - RecycleBin' : 'RecycleBin'}</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossOrigin="anonymous"
                />
            </Head>
            <div className="flex flex-col justify-between min-h-screen">
                <header>
                    <nav className="flex justify-between h-16 shadow-md items-center px-20">
                        <Link href='/' className="text-2xl font-bold">RecycleBin</Link>
                        {
                            !auth.user ? (
                                <div>
                                    <Link href='/ProductCatalog' className="me-2 font-bold">Products</Link>
                                    <Link href='/login' className="p-2 font-bold">LogIn</Link>
                                    <Link href='/signup' className="p-2 font-bold">SignUp</Link>
                                </div>
                            ) : (
                                <div className="flex justify between">
                                    <Link href='/ProductCatalog' className="p-4 font-bold">
                                        <div className="flex">
                                            <MdOutlineProductionQuantityLimits className="mt-1.5 me-2" />
                                            Products
                                        </div>
                                    </Link>
                                    <Link href='/sell' className="p-4 font-bold">Sell Product</Link>
                                    <Link href='/cart' className="flex p-4 font-bold">
                                        <AiOutlineShoppingCart className="mt-1 mr-1" />Cart
                                        {cartItems.length > 0 && (
                                            <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                                {cartItems.reduce((a, c) => a + c.quantity, 0)}
                                            </span>
                                        )}
                                    </Link>
                                    <button className="p-3" data-te-toggle="tooltip" title={auth.user.name}>
                                        <img src={`http://localhost:8080/${auth.user.avatar}`} className="h-[30px] w-[30px] object-cover rounded-full"></img>
                                    </button>
                                    <button className="p-4 font-bold" onClick={handleLogout}>
                                        <div className="flex">
                                            <FiLogOut className="mt-1.5 me-2" />
                                            LogOut
                                        </div>
                                    </button>
                                </div>
                            )}
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">
                    <ToastContainer />
                    {children}
                </main>
                <footer className="flex justify-center items-center h-10 shadow-inner">
                    <p>Copyright © 2023 RecycleBin</p>
                </footer>
            </div>
        </>
    )
}
