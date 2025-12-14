'use client';

import { useSelector } from 'react-redux';

interface Props {
  permission: string;
  children: React.ReactNode;
}

export default function PermissionGate({
  permission,
  children,
}: Props) {
  const permissions = useSelector(
    (state: any) => state.auth.user?.permissions || []
  );

  if (
    permissions.includes('*') ||
    permissions.includes(permission)
  ) {
    return <>{children}</>;
  }

  return null;
}
