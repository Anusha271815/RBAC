import ProtectedRoute from '@/components/ProtectedRoute';

export default function SellerPage() {
  return (
    <ProtectedRoute allowedRoles={['seller', 'admin']}>
      <h1>Seller Dashboard</h1>
    </ProtectedRoute>
  );
}
