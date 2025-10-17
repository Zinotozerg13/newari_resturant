import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Signup = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/customers/register", formData);
      console.log("Signup success:", response.data);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      navigate("/");
      
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    } 
  };

  return (
    <div className="min-h-screen bg-orange-50">
      
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-600">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-red-800 mb-2">Join Us</h2>
              <p className="text-red-600">खाता बनाउनुहोस् • Create your account</p>
            </div>

            <div className="space-y-6">
              {/* Name Fields */}
              <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-red-800 font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstname"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-red-800 font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastname"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-red-800 font-semibold mb-2">Email Address *</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                    value={formData.email}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-red-800 font-semibold mb-2">Phone Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="+977-XXX-XXXXXX"
                    value={formData.phone}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-red-800 font-semibold mb-2">Password *</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors duration-300"
                    placeholder="Create a password"
                    value={formData.password}
                  />
                </div>
              </div>

             

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-1" />
                <span className="ml-3 text-sm text-red-700">
                  I agree to the <a href="/terms" className="text-red-600 hover:text-red-800 font-semibold underline">Terms and Conditions</a> and <a href="/privacy" className="text-red-600 hover:text-red-800 font-semibold underline">Privacy Policy</a>
                </span>
              </div>

              {/* Submit Button */}
              <button type='submit' className="w-full py-3 rounded-lg text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Create Account
              </button>
              </form>

              {/* Login Link */}
              <div className="text-center pt-6">
                <p className="text-red-700">
                  Already have an account? <a href="/login" className="text-red-600 hover:text-red-800 font-bold">Sign in here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Signup;
