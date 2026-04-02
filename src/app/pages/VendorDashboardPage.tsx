import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Calendar, Clock, CheckCircle, XCircle, TrendingUp, Users, IndianRupee, Star, Bell, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getVendorOrders, updateBookingStatus, type VendorOrder } from '../../api/bookings';
import { getVendorStats, toggleAvailability, updateWorkingHours, addBlockedDate } from '../../api/vendors';

export function VendorDashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [availability, setAvailability] = useState(true);
  const [selectedTab, setSelectedTab] = useState('orders');
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [blockedDate, setBlockedDate] = useState('');
  const [workStart, setWorkStart] = useState('09:00');
  const [workEnd, setWorkEnd] = useState('21:00');
  const [stats, setStats] = useState({
    totalBookings: 0,
    thisMonth: 0,
    totalRevenue: 0,
    avgRating: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/vendor-login');
      return;
    }
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, statsData] = await Promise.all([
        getVendorOrders(),
        getVendorStats()
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleToggleAvailability = async () => {
    try {
      const result = await toggleAvailability();
      setAvailability(result.available);
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  const handleAcceptOrder = async (rawId: number) => {
    try {
      await updateBookingStatus(rawId, 'confirmed');
      loadData();
    } catch (err) {
      console.error('Failed to accept order:', err);
    }
  };

  const handleDeclineOrder = async (rawId: number) => {
    try {
      await updateBookingStatus(rawId, 'declined');
      loadData();
    } catch (err) {
      console.error('Failed to decline order:', err);
    }
  };

  const handleUpdateHours = async () => {
    try {
      await updateWorkingHours(workStart, workEnd);
      alert('Working hours updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to update hours');
    }
  };

  const handleAddBlockedDate = async () => {
    if (!blockedDate) return;
    try {
      await addBlockedDate(blockedDate);
      alert('Date blocked successfully!');
      setBlockedDate('');
    } catch (err: any) {
      alert(err.message || 'Failed to block date');
    }
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  const statCards = [
    { label: 'Total Bookings', value: String(stats.totalBookings), icon: Calendar, color: 'from-orange-500 to-yellow-500' },
    { label: 'This Month', value: String(stats.thisMonth), icon: TrendingUp, color: 'from-pink-500 to-red-500' },
    { label: 'Total Revenue', value: formatRevenue(stats.totalRevenue), icon: IndianRupee, color: 'from-purple-500 to-indigo-500' },
    { label: 'Rating', value: stats.avgRating > 0 ? String(stats.avgRating) : 'N/A', icon: Star, color: 'from-green-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition">
                Celebrate
              </div>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-gray-900">Vendor Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Availability Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Available:</span>
                <button
                  onClick={handleToggleAvailability}
                  className={`relative w-14 h-7 rounded-full transition ${availability ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${availability ? 'translate-x-7' : 'translate-x-0'
                    }`}></div>
                </button>
              </div>

              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.businessName || 'Vendor'}! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setSelectedTab('orders')}
              className={`px-6 py-3 font-semibold transition ${selectedTab === 'orders'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Orders
            </button>
            <button
              onClick={() => setSelectedTab('availability')}
              className={`px-6 py-3 font-semibold transition ${selectedTab === 'availability'
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Availability
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        ) : (
          <>
            {/* Orders Tab */}
            {selectedTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
                  <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>
                  <p className="text-gray-600">Manage your bookings and deliverables</p>
                </div>

                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600">You'll see customer orders here once they start coming in.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-900 text-lg">{order.id}</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'declined'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="text-gray-700 font-semibold">{order.customer}</div>
                            <div className="text-sm text-gray-600">{order.event}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">
                              ₹{order.amount.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span className="text-sm">{order.date ? new Date(order.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) : 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Users className="w-4 h-4 text-pink-600" />
                            <span className="text-sm">{order.location}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleAcceptOrder(order.rawId)}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Accept</span>
                              </button>
                              <button
                                onClick={() => handleDeclineOrder(order.rawId)}
                                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                              >
                                <XCircle className="w-4 h-4" />
                                <span>Decline</span>
                              </button>
                            </>
                          )}
                          <button className="flex items-center gap-2 border-2 border-purple-500 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Availability Tab */}
            {selectedTab === 'availability' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Your Availability</h2>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Current Status</h3>
                        <p className="text-gray-600">Let customers know if you're available</p>
                      </div>
                      <div className={`px-6 py-3 rounded-full font-bold ${availability ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                        }`}>
                        {availability ? 'Available' : 'Not Available'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Block Dates</h3>
                    <p className="text-gray-600 mb-4">Select dates when you won't be available for bookings</p>
                    <input
                      type="date"
                      value={blockedDate}
                      onChange={(e) => setBlockedDate(e.target.value)}
                      className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                    />
                    <button
                      onClick={handleAddBlockedDate}
                      className="ml-0 md:ml-4 mt-4 md:mt-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition"
                    >
                      Add Blocked Date
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Working Hours</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={workStart}
                          onChange={(e) => setWorkStart(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          value={workEnd}
                          onChange={(e) => setWorkEnd(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleUpdateHours}
                      className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition"
                    >
                      Update Hours
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
