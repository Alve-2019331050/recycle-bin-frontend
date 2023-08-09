import React from 'react'
import Link from 'next/link'
import {
  FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope,

} from 'react-icons/fa';
import {
  MdLockOutline,MdPersonOutline,MdPhoneAndroid
} from 'react-icons/md';

export default function Signup() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-violet-100">
        <div className="bg-white rounded-bl-2xl shadow-2xl shadow-violet-600 flex w-2/3 max-w-4xl">
          {/* Sign up section */}
          <div className="text-xl font-semibold w-3/5 p-5 border-l-indigo-500">
            <div className="text-left">
              <span className="text-black italic font-mono">Recycle</span><span className="text-red-600 font-bold">Bin</span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-violet-900">
                Register Now!
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
              <p className="text-gray-400 m-3">Provide the following information</p>
              <div className='flex flex-col items-center'>
                <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                  <MdPersonOutline className='text-gray-400 m-3' />
                  <input type='text' name='userName' placeholder='User Name' className='bg-gray-100 text-base outline-none flex-1'></input>
                </div>
                <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                  <MdPhoneAndroid className='text-gray-400 m-3' />
                  <input type='number' name='mobileNumber' placeholder='Mobile Number' className='bg-gray-100 text-base outline-none flex-1'></input>
                </div>
                <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                  <FaRegEnvelope className='text-gray-400 m-3' />
                  <input type='email' name='email' placeholder='Email' className='bg-gray-100 text-base outline-none flex-1'></input>
                </div>
                <div className='bg-gray-100 w-80 p-2 flex items-center'>
                  <MdLockOutline className='text-gray-400 m-3' />
                  <input type='password' name='password' placeholder='Password' className='bg-gray-100 text-base outline-none flex-1'></input>
                </div>
                
                <a href="#" className="bg-white mt-5 border-4 border-violet-900 rounded-full px-12 py-2 shadow-2xl 
                text-violet-900 hover:bg-violet-900 hover:text-white">Register</a>
              </div>
            </div>
          </div>
          {/* Sign in section */}
          <div className="font-bold text-white w-2/5 bg-violet-900 rounded-tr-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Welcome to our Community!</h2>
            <div className="border-2 w-16 border-white inline-block mb-2"></div>
            <div className="font-light mb-10">
              <i><b>Already registered?</b></i><br />
              <div className='mt-3'>Sign in to your account and unlock a world of personalized experiences and exciting offers.</div> <br />
              <div className='mt-5'><b>Your adventure awaits – let's get started!</b></div>
            </div>
            <Link href="/login" className="bg-violet-400 border-2 border-white rounded-full px-12 py-2 shadow-inner hover:bg-white hover:text-violet-900">Sign In</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
