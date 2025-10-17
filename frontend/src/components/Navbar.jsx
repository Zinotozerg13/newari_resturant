import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn ,scrollToFooter}) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = () => navigate("/login");

  const confirmLogout = async () => {
    setLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost:4000/customers/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      
    } finally {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
      setShowLogoutModal(false);
      setLoggingOut(false);
    }
  };

   const LogoutIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );

  const LoginIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>
  );

  

  return (
    <div>
      <div className="h-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500"></div>
      <nav className="bg-red-800 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="text-yellow-400 text-4xl font-bold">नेवा:</div>
            <div className="text-orange-200 text-2xl font-bold">Newa Baji</div>
          </div>

        
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-orange-200 hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Home</a>
            <a href="/menu" className="text-orange-200 hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Menu</a>
            <a href="/about" className="text-orange-200 hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">About</a>
            <a onClick={scrollToFooter}  className="text-orange-200 hover:text-yellow-400 transition-colors duration-300 font-medium text-lg">Contact</a>
            {!isLoggedIn ? (
              <button onClick={handleLogin} className="flex items-center gap-2 bg-yellow-500 text-red-800 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg">
                <LoginIcon />
                <span>Login</span>
              </button>
            ) : (
              <button onClick={() => setShowLogoutModal(true)} className="bg-red-600 text-yellow-400 p-2 rounded-lg hover:bg-red-700">
                <LogoutIcon />
              </button>
            )}
          </div>

         
          <div className="md:hidden flex items-center space-x-3">
            {!isLoggedIn ? (
              <button onClick={handleLogin} className="flex items-center gap-2 bg-yellow-500 text-red-800 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg">
                <LoginIcon />
                <span>Login</span>
              </button>
            ) : (
              <button onClick={() => setShowLogoutModal(true)} className="bg-red-600 text-yellow-400 p-2 rounded-lg">
                <LogoutIcon />
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-orange-200">
              <div className="w-6 h-0.5 bg-orange-200 mb-1"></div>
              <div className="w-6 h-0.5 bg-orange-200 mb-1"></div>
              <div className="w-6 h-0.5 bg-orange-200"></div>
            </button>
          </div>
        </div>

       
        {menuOpen && (
          <div className="md:hidden flex flex-col bg-red-800 px-4 py-3 space-y-2">
            <a href="/" className="text-orange-200 hover:text-yellow-400">Home</a>
            <a href="/menu" className="text-orange-200 hover:text-yellow-400">Menu</a>
            <a href="/about" className="text-orange-200 hover:text-yellow-400">About</a>
            <a onClick={scrollToFooter} className="text-orange-200 hover:text-yellow-400">Contact</a>
          </div>
        )}
      </nav>

     
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center">
            <h3 className="text-xl font-bold text-red-800 mb-3">Logout?</h3>
            <p className="text-red-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 border-2 border-gray-300 px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={confirmLogout} disabled={loggingOut} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg">
                {loggingOut ? "..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
