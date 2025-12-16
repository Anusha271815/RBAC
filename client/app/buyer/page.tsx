import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function BuyerPage() {
  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']}>
      <div className="min-h-screen bg-gray-100 p-6">
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Buyer Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Browse products and place your orders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">

          <PermissionGate permission="VIEW_PRODUCTS">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Browse Products
                </h2>
                <p className="text-gray-600 mt-2">
                  View available items and compare prices.
                </p>
              </div>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                View Products
              </button>
            </div>
          </PermissionGate>

          <PermissionGate permission="PLACE_ORDER">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Place Order
                </h2>
                <p className="text-gray-600 mt-2">
                  Add products to cart and place your order.
                </p>
              </div>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
                Place Order
              </button>
            </div>
          </PermissionGate>

        </div>
      </div>
    </ProtectedRoute>
  );
}

