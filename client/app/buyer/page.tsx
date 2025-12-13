import ProtectedRoute from '@/components/ProtectedRoute';

export default function BuyerPage() {
  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']}>
      <h1>Buyer Dashboard</h1>
    </ProtectedRoute>
  );
}
