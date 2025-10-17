import React, { useState,useContext } from 'react';
import menuItems from '../../data/menuitems';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('snacks');
  const { cart, addToCart, updateQuantity, getCartTotal, getCartItemCount,placeOrder } = useContext(CartContext);
  const navigate = useNavigate();
  
  const getCategoryName = (category) => {
    const names = {
      snacks: { en: 'Snacks', ne: 'खाजा' },
      weekendSpecial: { en: 'Weekend Special', ne: 'सप्ताहान्त विशेष' },
      seasonal: { en: 'Seasonal', ne: 'मौसमी' },
      yomari: { en: 'Yomari', ne: 'योमरी' },
      bara: { en: 'Bara', ne: 'बारा' },
      chatamari: { en: 'Chatamari', ne: 'चाटामरी' },
      momo: { en: 'MoMo', ne: 'मोमो' },
      liquor: { en: 'Liquor', ne: 'मदिरा' },
      
      liquorSpecial: { en: 'Liquor Special', ne: 'मदिरा विशेष' },
    };
    return names[category] || { en: category, ne: category };
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <section className="py-16 px-6 bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#f97316] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-yellow-400 text-xl mb-4 font-semibold">खाना सूची</div>
          <h1 className="text-5xl font-bold mb-6">Traditional Menu</h1>
          <p className="text-xl text-orange-200">
            Authentic Newari dishes prepared with ancient recipes and sacred traditions
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-red-800 mb-4">Place Your Order</h1>
              <p className="text-red-600 text-lg">अर्डर गर्नुहोस् • Choose your favorite Newari dishes</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.keys(menuItems).map((category) => {
                const categoryInfo = getCategoryName(category);
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-red-600 text-yellow-400 shadow-lg transform scale-105'
                        : 'bg-gray-100 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {categoryInfo.en}
                    <div className="text-sm opacity-75">
                      {categoryInfo.ne}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              {menuItems[activeCategory].map((item) => (
                <div
                  key={item.foodid}
                  className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden ${
                    item.specialty ? 'border border-yellow-400' : 'border border-gray-100'
                  }`}
                >
                  {/* Decorative corner pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="absolute top-2 right-2 w-4 h-4 bg-red-600 rounded-full"></div>
                    <div className="absolute top-4 right-6 w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="absolute top-6 right-4 w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>

                  {item.specialty && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-800 px-4 py-1 rounded-bl-lg font-bold text-xs">
                      ★ HOUSE SPECIAL
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-6">
                      <div className="mb-3">
                        <h3 className="text-2xl font-bold text-red-800 mb-1">{item.name}</h3>
                        <div className="text-lg text-orange-600 font-semibold italic">{item.nepali}</div>
                      </div>
                      
                      <p className="text-red-700 leading-relaxed text-base mb-4">{item.description}</p>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="text-right flex flex-col items-end">
                      <div className="text-3xl font-bold text-red-600 mb-4 bg-red-50 px-4 py-2 rounded-lg">
                        Rs. {item.price}
                      </div>
                      <button
                        onClick={() => 
                          
                          addToCart(item)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-28">
              <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2 2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Your Order
                {getCartItemCount() > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2 2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add items to start ordering</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.foodid} className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-800">{item.name}</h4>
                          <p className="text-sm text-orange-600">{item.nepali}</p>
                          <p className="text-red-600 font-bold">Rs. {item.price}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.foodid, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.foodid, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold text-red-800">
                      <span>Total:</span>
                      <span>Rs. {getCartTotal()}</span>
                    </div>
                  </div>

                  <button onClick={placeOrder}className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Place Order
                  </button>

                  <button
                    onClick={() => setCart([])}
                    className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Menu;