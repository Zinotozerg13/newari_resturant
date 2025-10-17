import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:4000/orders/history');
        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent"></div>
          <p className="mt-4 text-xl font-semibold text-red-600">Loading orders...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🍽️ Admin Dashboard</h1>
          <p className="text-gray-600">Manage your restaurant orders and analytics</p>
        </div>

        
        <div className="flex space-x-2 mb-8 bg-white rounded-xl p-2 shadow-md">
          {['overview', 'orders'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {tab === 'overview' ? '📊' : '🛒'}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            </button>
          ))}
        </div>

        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-600 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold mb-1">Total Orders</p>
                    <p className="text-4xl font-bold text-red-800">{orders.length}</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-full text-3xl">
                    🛍️
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold mb-1">Total Revenue</p>
                    <p className="text-4xl font-bold text-yellow-600">
                      Rs. {orders.reduce((sum, o) => sum + o.totalAmount, 0)}
                    </p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-full text-3xl">
                    💰
                  </div>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold mb-1">Pending Orders</p>
                    <p className="text-4xl font-bold text-orange-600">
                      {orders.filter(o => o.orderStatus === 'placed').length}
                    </p>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-full text-3xl">
                    ⏳
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Recent Orders
              </h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map(order => (
                  <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 p-3 rounded-full text-xl">
                        👤
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {order.customerId
                            ? `${order.customerId?.firstname} ${order.customerId?.lastname}`
                            : 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">Rs. {order.totalAmount}</p>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          order.orderStatus === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.orderStatus === 'preparing'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-red-500 to-orange-500">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🛒</span>
                All Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Order ID', 'Customer', 'Phone', 'Items', 'Total', 'Status', 'Date'].map(
                      header => (
                        <th
                          key={header}
                          className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6">
                        <span className="font-mono text-sm text-gray-800 font-semibold">
                          #{order._id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">👤</span>
                          <span className="font-medium text-gray-800">
                            {order.customerId
                              ? `${order.customerId?.firstname} ${order.customerId?.lastname}`
                              : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📞</span>
                          <span className="text-gray-600">{order.customerId?.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {order.items.map(item => (
                            <div key={item.foodid} className="text-sm">
                              <span className="text-gray-700">{item.name}</span>
                              <span className="text-gray-500"> × {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-800">Rs. {order.totalAmount}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            order.orderStatus === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.orderStatus === 'preparing'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>📅</span>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          🕐 {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;