'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerRequest, clearMessage } from '@/store/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');

  const { successMessage, error, loading } = useSelector(
    (state: any) => state.auth
  );

  const submit = () => {
    if (!email || !password) return;
    dispatch(registerRequest({ email, password, role }));
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
        router.push('/login');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register
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
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        {loading && (
          <p className="text-center text-blue-500 text-sm">
            Registering...
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
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;
