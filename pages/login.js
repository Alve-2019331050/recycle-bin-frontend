import Layout from "@/components/Layout";
import { useAuth } from "@/context/auth";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope
} from 'react-icons/fa';
import {
  MdLockOutline
} from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();
  const [auth,setAuth] = useAuth();

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      console.log(email,password);
        const res = await axios.post('http://localhost:8080/api/v1/auth/login',{
          email,
          password
        });
        if(res.data.success){
          toast.success(res.data.message);
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          });
          window.localStorage.setItem('auth',JSON.stringify(res.data));
          router.push('/');
        }
        else{
          toast.error(res.data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-violet-100">
          <div className="bg-white rounded-bl-2xl shadow-2xl shadow-violet-600 flex w-2/3 max-w-4xl">
            {/* Sign in section */}
            <div className="text-xl font-semibold w-3/5 p-5 border-l-indigo-500">
              <div className="text-left">
                <span className="text-black italic font-mono">Recycle</span><span className="text-red-600 font-bold">Bin</span>
              </div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-violet-900">
                  Sign In To Account
                </h2>
                <div className="border-2 w-20 border-violet-500 inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                  <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaGoogle className="text-sm" />
                  </a>
                  <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                    <FaLinkedinIn className="text-sm" />
                  </a>
                </div>{/* Social media login section */}
                <p className="text-gray-400 m-3">Or Use your E-mail Account</p>
                <div className='flex flex-col items-center'>
                  <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                    <FaRegEnvelope className='text-gray-400 m-3' />
                    <input type='email' name='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-gray-100 text-base outline-none flex-1'></input>
                  </div>
                  <div className='bg-gray-100 w-80 p-2 flex items-center'>
                    <MdLockOutline className='text-gray-400 m-3' />
                    <input type='password' name='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-gray-100 text-base outline-none flex-1'></input>
                  </div>
                  <div className='flex w-80 mb-5 mt-3 justify-between'>
                    <label className='flex items-center text-xs'>
                      <input type='checkbox' name='remember' className='mr-1' />Remember me
                    </label>
                    <a href='#' className='text-xs hover:font-bold'>Forgot Password?</a>
                  </div>
                  <button onClick={handleLogin} className="bg-white border-4 border-violet-900 rounded-full px-12 py-2 shadow-2xl text-violet-900 hover:bg-violet-900 hover:text-white">Sign In</button>
                </div>
              </div>
            </div>
            {/* Sign up section */}
            <div className="font-bold text-white w-2/5 bg-violet-900 rounded-tr-2xl py-36 px-12">
              <h2 className="text-3xl font-bold mb-2">Welcome to our Community!</h2>
              <div className="border-2 w-16 border-white inline-block mb-2"></div>
              <p className="font-light mb-10">
                Ready to embark on a seamless shopping journey? Sign up now to unlock a world of
                convenience and incredible deals.
              </p>
              <Link href="/signup" className="bg-violet-400 border-2 border-white rounded-full px-12 py-2 shadow-inner hover:bg-white hover:text-violet-900">Sign Up</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
