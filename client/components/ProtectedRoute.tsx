'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const { token, user } = useSelector((s: any) => s.auth);

  useEffect(() => {
    if (!token) router.push('/login');
    else if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
      router.push('/');
    }
  }, [token, user]);

  if (!token) return null;
  if (allowedRoles.length && !allowedRoles.includes(user?.role)) return null;

  return <>{children}</>;
}
