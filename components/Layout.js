import { useAuth } from "@/context/auth";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
    const [auth] = useAuth();
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
                <nav className="flex justify-between h-14 shadow-md items-center px-20">
                    <Link href='/' className="text-xl font-bold">RecycleBin</Link>
                    {
                        !auth.user ? (
                            <div>
                                <Link href='/login' className="p-2 font-bold">LogIn</Link>
                                <Link href='/signup' className="p-2 font-bold">SignUp</Link>
                            </div>
                        ): <Link to='/login' className="p-2 font-bold">LogOut</Link>
                    }
                </nav>
            </header>
            <main className="container m-auto mt-4 px-4">
                {children}
            </main>
            <footer className="flex justify-center items-center h-10 shadow-inner">
                <p>Copyright © 2023 RecycleBin</p>
            </footer>
        </div>
        </>
    )
}
