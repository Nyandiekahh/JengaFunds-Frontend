import { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';

// Backend URL - Will be used when backend is integrated
const API_BASE_URL = 'http://localhost:5000/api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone_number: '',
    role: 'borrower'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // =================== FOR TESTING ONLY - START ===================
    // Comment out this section when integrating with backend
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin', // Change to 'borrower' or 'lender' to test different roles
      is_admin: true
    }));
    window.location.href = '/dashboard';
    return;
    // =================== FOR TESTING ONLY - END ===================

    // =================== PRODUCTION CODE - START ===================
    // Uncomment this section when integrating with backend
    /*
    try {
      const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/signup`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (isLogin) {
        // Store user data and token
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    */
    // =================== PRODUCTION CODE - END ===================
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-50" />
        
        <div className="relative">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {isLogin ? 'Sign in to continue' : 'Create your account'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div className="relative">
                  <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Full Name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="relative">
                  <select
                    name="role"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    onChange={handleInputChange}
                    value={formData.role}
                  >
                    <option value="borrower">Borrower</option>
                    <option value="lender">Lender</option>
                  </select>
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Email address"
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 hover:text-indigo-800 transition"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}