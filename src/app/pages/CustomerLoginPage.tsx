import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, User, Phone, ArrowLeft, PartyPopper, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { customerLogin, customerSignup } from '../../api/auth';

export function CustomerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isSignUp) {
        response = await customerSignup(formData);
      } else {
        response = await customerLogin({ email: formData.email, password: formData.password });
      }
      login(response.token, response.user);
      navigate('/customer-dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <PartyPopper className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-gray-900">Customer Portal</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">Celebrate</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              "We are here, So you can enjoy your moments hassle free"
            </p>

            <div className="space-y-4 text-left bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Why Choose Celebrate?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <span className="text-orange-600">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">500+ Verified Vendors</div>
                    <div className="text-sm text-gray-600">All professionals are verified and trusted</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <span className="text-pink-600">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Best Price Guarantee</div>
                    <div className="text-sm text-gray-600">Compare and choose the best deals</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <span className="text-purple-600">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Hassle-Free Planning</div>
                    <div className="text-sm text-gray-600">We handle everything from A to Z</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Start planning your perfect event' : 'Login to continue planning'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSignUp ? 'Create Account' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-gray-600 mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="border-2 border-gray-200 rounded-xl py-3 hover:border-orange-500 transition font-semibold">
                  Google
                </button>
                <button className="border-2 border-gray-200 rounded-xl py-3 hover:border-orange-500 transition font-semibold">
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
