'use client';
import { loginRequest } from '@/store/authSlice';
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const login = () => {
    const dispatch=useDispatch();

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    function submit(){
        dispatch(loginRequest({email,password}));
    }
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5 ">
    
    <h1 className="text-2xl font-bold text-center text-gray-800">
    Login Page
    </h1>

    <input
      type="text"
      placeholder="abc@gmail.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />

    <input
      type="password"
      placeholder="pass****"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />

    <button
      className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
      onSubmit={submit}
    >
      Login
    </button>

    </div>
    </div>


    </>
  )
}

export default login