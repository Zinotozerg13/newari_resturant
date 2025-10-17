import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const Order = () => {
  const { cart, updateQuantity, getCartTotal, placeOrder } = useContext(CartContext);


  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryNotes: '',
    paymentMethod: 'cash'
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = 50;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;


  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/customers/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const customer = res.data.customer;
        setCustomerInfo({
          name: customer.firstname + ' ' + customer.lastname,
          phone: customer.phone,
          email: customer.email,
          address: '',
          deliveryNotes: ''
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePlaceOrder = async () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      const res=await axios.post("http://localhost:4000/orders/place", {
        items: cart.map(item => ({
          foodid: item.foodid,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        address: customerInfo.address,
        deliveryNotes: customerInfo.deliveryNotes,
        paymentMethod,
        totalAmount: total
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("Order placed successfully:", res.data);
      
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full border-4 border-yellow-400 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 to-yellow-500"></div>
          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-white text-3xl">✓</div>
          </div>
          <div className="text-yellow-500 text-lg mb-2 font-bold">धन्यवाद • Thank You • शुभकामना</div>
          <h1 className="text-3xl font-bold text-red-800 mb-3">Order Confirmed!</h1>
          <p className="text-red-600 mb-4 text-lg">Your authentic Newari feast is being prepared with love.</p>
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl mb-6 border-2 border-yellow-400">
            <p className="text-red-800 font-bold text-xl">Total: Rs. {total}</p>
            <p className="text-sm text-red-700 mt-1">Estimated delivery: 30-45 minutes</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-full font-bold hover:from-red-700 hover:to-yellow-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        
        <div className="text-center mb-12">
          <div className="text-red-600 text-xl mb-4 font-semibold">अन्तिम चरण • Final Step • अर्डर पूरा गर्नुहोस्</div>
          <h1 className="text-5xl font-bold text-red-800 mb-4">Complete Your <span className="text-yellow-500">Traditional</span> Order</h1>
          <p className="text-xl text-red-700 max-w-3xl mx-auto">Almost ready to enjoy authentic Newari cuisine delivered to your doorstep</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-yellow-400 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 to-yellow-500"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-lg">👤</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-800">Customer Information</h2>
                  <p className="text-red-600">Your registered details</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border-2 border-orange-200">
                  <label className="flex items-center gap-2 text-sm font-semibold text-red-700 mb-2">
                    👤 Name
                  </label>
                  <p className="text-red-800 font-bold text-lg">{customerInfo.name || 'Guest'}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border-2 border-orange-200">
                  <label className="flex items-center gap-2 text-sm font-semibold text-red-700 mb-2">
                    📱 Phone Number
                  </label>
                  <p className="text-red-800 font-bold text-lg">{customerInfo.phone || 'N/A'}</p>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-red-700">
                      📍 Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none bg-orange-50"
                      rows={3}
                      placeholder="Enter your complete delivery address..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-red-700">
                      🚚 Delivery Notes (Optional)
                    </label>
                    <textarea
                      name="deliveryNotes"
                      value={customerInfo.deliveryNotes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryNotes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all resize-none bg-orange-50"
                      rows={2}
                      placeholder="Any special instructions for our delivery team..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-yellow-400 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-lg">💳</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-800">Payment Method</h2>
                  <p className="text-red-600">Choose your preferred payment option</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center p-6 border-3 border-orange-200 rounded-xl cursor-pointer hover:border-red-400 transition-all bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-lg">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <div className="ml-6">
                    <div className="font-bold text-red-800 text-lg">💰 Cash on Delivery (COD)</div>
                    <div className="text-red-600">Pay when your delicious meal arrives at your door</div>
                  </div>
                </label>
                
                <label className="flex items-center p-6 border-3 border-orange-200 rounded-xl cursor-pointer hover:border-red-400 transition-all bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-lg">
                  <input
                    type="radio"
                    value="esewa"
                    checked={paymentMethod === 'esewa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-red-600 focus:ring-red-500"
                  />
                  <div className="ml-6">
                    <div className="font-bold text-red-800 text-lg">📱 Online Payment</div>
                    <div className="text-red-600">Pay securely with eSewa, Khalti, or Mobile Banking</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-yellow-400 sticky top-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-500 to-red-600"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-lg">🛍️</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-800">Order Summary</h2>
                  <p className="text-red-600">Traditional Newari feast</p>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl text-red-300 mb-4">🛍️</div>
                  <p className="text-red-500 text-lg">Your cart is empty</p>
                  <p className="text-red-400 text-sm">Add some delicious items to continue</p>
                </div>
              ) : (
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.foodid} className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                      <div className="flex-1">
                        <h4 className="font-bold text-red-800 text-lg">{item.name}</h4>
                        <p className="text-red-600">Quantity: {item.quantity} × Rs. {item.price}</p>
                      </div>
                      <div className="font-bold text-red-600 text-lg">Rs. {item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
              )}

             
              <div className="border-t-4 border-yellow-400 pt-6 space-y-4">
                <div className="flex justify-between text-red-700 text-lg">
                  <span>Subtotal:</span>
                  <span className="font-semibold">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-red-700 text-lg">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold">Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between font-bold text-2xl text-red-800 border-t-2 border-red-200 pt-4">
                  <span>Total:</span>
                  <span className="text-red-600">Rs. {total}</span>
                </div>
              </div>

              
              <button
                onClick={() => {
    
      handlePlaceOrder();     
    
  }}
                disabled={loading || cart.length === 0}
                className="w-full mt-8 bg-gradient-to-r from-red-600 to-yellow-500 text-white py-5 rounded-full font-bold text-xl hover:from-red-700 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-lg border-2 border-red-700"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    💳 Place Order (Rs. {total})
                  </>
                )}
              </button>
              
              <div className="text-center mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                <p className="text-sm text-red-700 font-semibold">
                  🙏 Every dish is prepared with traditional methods and blessed ingredients
                </p>
                <p className="text-xs text-red-600 mt-2">
                  By placing this order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;