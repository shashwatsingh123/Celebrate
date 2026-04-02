import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Phone, ArrowLeft, Briefcase, TrendingUp, Users, Award, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { vendorLogin, vendorSignup } from '../../api/auth';

export function VendorLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (isSignUp) {
        response = await vendorSignup(formData);
      } else {
        response = await vendorLogin({ email: formData.email, password: formData.password });
      }
      login(response.token, response.user);
      navigate('/vendor-dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-purple-600 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
              <Briefcase className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Vendor Portal</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Grow Your Business with <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-600 bg-clip-text text-transparent">Celebrate</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              "Partner with us to reach thousands of customers and build a thriving business"
            </p>

            <div className="space-y-4 text-left bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="font-bold text-xl text-gray-900 mb-4">Why Partner With Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Expand Your Reach</div>
                    <div className="text-sm text-gray-600">Get discovered by 50,000+ active customers across India</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quality Leads</div>
                    <div className="text-sm text-gray-600">Receive verified bookings from serious customers</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Award className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Build Your Brand</div>
                    <div className="text-sm text-gray-600">Showcase your work and get reviews to build credibility</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-green-600 font-bold">₹</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Easy Management</div>
                    <div className="text-sm text-gray-600">Simple dashboard to manage orders and availability</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <div className="text-3xl font-bold mb-2">Join 500+ Vendors</div>
              <div className="text-purple-100">Already growing their business with Celebrate</div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Register Your Business' : 'Vendor Login'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Start receiving quality bookings today' : 'Manage your business efficiently'}
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
                    Business/Service Name
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                      placeholder="E.g., Raj Caterers"
                    />
                  </div>
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="">Select your category</option>
                    <option value="caterer">Caterer</option>
                    <option value="photographer">Photographer</option>
                    <option value="pandit">Pandit</option>
                    <option value="decorator">Decorator</option>
                    <option value="entertainment">Entertainment & DJ</option>
                    <option value="gifts">Gift & Favors</option>
                  </select>
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isSignUp ? 'Register as Vendor' : 'Login to Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {isSignUp ? 'Already registered? Login' : "New vendor? Register now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
