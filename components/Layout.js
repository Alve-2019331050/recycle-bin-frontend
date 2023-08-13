import { useAuth } from "@/context/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, children }) {
    const [auth,setAuth] = useAuth();
    const router = useRouter();

    const handleLogout = (e)=>{
        e.preventDefault();
        setAuth({
            user:null,
            token:''
        });
        router.push('/login');
    }

    const showUserInfo = (e)=>{
        e.preventDefault();
        
    }
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
                            ): (
                            <div className="flex justify between">
                                <Link href='/ProductCatalog' className="p-4 font-bold">
                                    <div className="flex">
                                        <MdOutlineProductionQuantityLimits className="mt-1.5 me-2"/>
                                        Products
                                    </div>
                                </Link>
                                <Link href='/sell' className="p-4 font-bold">Sell Product</Link>
                                <button className="p-3" onClick={showUserInfo}>
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
