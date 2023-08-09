import Head from "next/head";
import Link from "next/link";

export default function Layout({title, children}) {
  return (
    <>
        <Head>
            <title>{title? title + ' - RecycleBin' : 'RecycleBin'}</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <div className="flex flex-col justify-between min-h-screen">
            <header>
                <nav className="flex justify-between h-14 shadow-md items-center px-20">
                    <Link href='/' className="text-xl font-bold">RecycleBin</Link>
                    <div>
                        <Link href='/login' className="p-2 font-bold">LogIn</Link>
                        <Link href='/signup' className="p-2 font-bold">SignUp</Link>
                    </div>
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
