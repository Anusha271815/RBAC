'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginRequest, clearMessage } from '@/store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isAuthenticated, successMessage, error, loading, user } = useSelector(
    (state: any) => state.auth
  );

  const submit = () => {
    if (!email || !password) return;
    dispatch(loginRequest({ email, password }));
  };
  
  useEffect(() => {
    console.log('AUTH STATE →', {
      isAuthenticated,
      user,
    });
  }, [isAuthenticated, user]);
  
  useEffect(() => {
    if (!isAuthenticated || !user?.role) return;
  
    switch (user.role) {
      case 'admin':
        router.replace('/admin');
        break;
      case 'seller':
        router.replace('/seller');
        break;
      default:
        router.replace('/buyer');
    }
  }, [isAuthenticated, user, router]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>

        <input
        suppressHydrationWarning
          type="email"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="pass****"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading && (
          <p className="text-center text-blue-500 text-sm">
            Logging in...
          </p>
        )}

        {successMessage && (
          <p className="text-center text-green-600 text-sm font-medium">
            {successMessage}
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          onClick={submit}
          disabled={loading}
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;
