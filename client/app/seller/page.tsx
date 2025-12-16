import ProtectedRoute from '@/components/ProtectedRoute';
import PermissionGate from '@/components/PermissionGate';

export default function SellerPage() {
  return (
    <ProtectedRoute allowedRoles={['seller', 'admin']}>
      <div className="min-h-screen bg-gray-100 p-6">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Seller Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your products and track customer orders
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">

          <PermissionGate permission="CREATE_PRODUCT">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Add New Product
                </h2>
                <p className="text-gray-600 mt-2">
                  Create and list new products for customers.
                </p>
              </div>
              <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                Add Product
              </button>
            </div>
          </PermissionGate>

          <PermissionGate permission="VIEW_ORDERS">
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  View Orders
                </h2>
                <p className="text-gray-600 mt-2">
                  Check customer orders and delivery status.
                </p>
              </div>
              <button className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition">
                View Orders
              </button>
            </div>
          </PermissionGate>

        </div>
      </div>
    </ProtectedRoute>
  );
}
