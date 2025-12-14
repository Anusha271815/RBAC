import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <h1>Admin Dashboard</h1>

      <PermissionGate permission="*">
        <p>Full system access</p>
      </PermissionGate>
    </ProtectedRoute>
  );
}
