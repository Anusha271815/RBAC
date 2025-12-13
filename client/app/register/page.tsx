'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerRequest } from '@/store/authSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');

  const submit = () => {
    dispatch(registerRequest({email, password, role }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h1>

        <input
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
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          onClick={submit}
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Register;
