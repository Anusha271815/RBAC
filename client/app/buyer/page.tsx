import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function BuyerPage() {
  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']}>
      <h1>Buyer Dashboard</h1>

      <PermissionGate permission="VIEW_PRODUCTS">
        <button>Browse Products</button>
      </PermissionGate>

      <PermissionGate permission="PLACE_ORDER">
        <button>Place Order</button>
      </PermissionGate>
    </ProtectedRoute>

  );
}
