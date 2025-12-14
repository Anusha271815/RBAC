import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function SellerPage() {
  return (
    <ProtectedRoute allowedRoles={['seller', 'admin']}>
      
      <h1>Seller Dashboard</h1>

      <PermissionGate permission="CREATE_PRODUCT">
        <button>Add Product</button>
      </PermissionGate>

      <PermissionGate permission="VIEW_ORDERS">
        <button>View Orders</button>
      </PermissionGate>

    </ProtectedRoute>
  );
}
