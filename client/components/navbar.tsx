'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        BuySell
      </Link>

      <div className="space-x-4">
        {!isAuthenticated ? (
          <>
            <Link
            suppressHydrationWarning
             href="/login">Login</Link>
            <Link
              href="/register"
              className="bg-blue-600 px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === 'admin' && (
              <Link href="/admin">Admin</Link>
            )}

            {user?.role === 'seller' && (
              <Link href="/seller">Seller</Link>
            )}

            {user?.role === 'buyer' && (
              <Link href="/buyer">Buyer</Link>
            )}

            <button
              onClick={() => dispatch(logout())}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

