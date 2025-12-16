import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-100 p-6">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage system settings and users
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl">
          <PermissionGate permission="*">
            <div className="border-l-4 border-red-500 pl-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Full System Access
              </h2>
              <p className="text-gray-600 mt-2">
                You have complete control over users, roles, and permissions.
              </p>
            </div>
          </PermissionGate>
        </div>

      </div>
    </ProtectedRoute>
  );
}

