import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Calendar, Star, MessageCircle, Clock, MapPin, Plus, Loader2, Sparkles, IndianRupee, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getCustomerBookings, type Booking } from '../../api/bookings';
import { createReview, getCustomerReviews } from '../../api/reviews';
import { getMyEvents } from '../../api/events';

interface PlannedEvent {
  id: number;
  event_type: string;
  event_date: string;
  guest_count: number;
  budget: string;
  address: string;
  city: string;
  pincode: string;
  services: string[];
  special_requests: string;
  status: string;
  created_at: string;
}

const eventTypeLabels: Record<string, string> = {
  pooja: 'Pooja Ceremony',
  birthday: 'Birthday Party',
  festival: 'Festival Celebration',
  surprise: 'Surprise Party',
  wedding: 'Wedding',
  corporate: 'Corporate Event',
  other: 'Other Event'
};

const serviceLabels: Record<string, string> = {
  catering: 'Catering',
  photography: 'Photography',
  pandit: 'Pandit Services',
  decoration: 'Decoration',
  entertainment: 'Entertainment & DJ',
  gifts: 'Gift & Favors',
  venue: 'Venue Booking',
  transport: 'Transportation'
};

export function CustomerDashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('events');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [events, setEvents] = useState<PlannedEvent[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reviewData, setReviewData] = useState({
    vendor: '',
    vendorId: 0,
    bookingId: 0,
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/customer-login');
      return;
    }
    loadData();
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsData, bookingsData, reviewsData] = await Promise.all([
        getMyEvents(),
        getCustomerBookings(),
        getCustomerReviews()
      ]);
      setEvents(eventsData);
      setBookings(bookingsData);
      setReviews(reviewsData);
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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await createReview({
        bookingId: reviewData.bookingId,
        vendorId: reviewData.vendorId,
        rating: reviewData.rating,
        comment: reviewData.comment
      });
      alert('Thank you for your feedback! Your review has been submitted.');
      setShowReviewModal(false);
      setReviewData({ vendor: '', vendorId: 0, bookingId: 0, rating: 5, comment: '' });
      loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  const openReviewModal = (booking: Booking) => {
    setReviewData({
      vendor: booking.vendor,
      vendorId: booking.vendorId,
      bookingId: booking.rawId,
      rating: 5,
      comment: ''
    });
    setShowReviewModal(true);
  };

  const upcomingEvents = events.filter(e => new Date(e.event_date) >= new Date()).length;
  const pendingReviewCount = bookings.filter(b => b.canReview).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition">
                Celebrate
              </div>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-gray-900">My Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/plan-event')}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition"
              >
                <Plus className="w-4 h-4" />
                <span>Plan New Event</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'User'}! 🎉</h1>
          <p className="text-gray-600">Manage your events and share your experiences</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600">{events.length}</div>
                <div className="text-sm text-gray-600">Events Planned</div>
              </div>
              <Sparkles className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-pink-600">{upcomingEvents}</div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
              <Clock className="w-12 h-12 text-pink-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">{bookings.length}</div>
                <div className="text-sm text-gray-600">Vendor Bookings</div>
              </div>
              <Calendar className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
                <div className="text-sm text-gray-600">Reviews Written</div>
              </div>
              <MessageCircle className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setSelectedTab('events')}
              className={`px-6 py-3 font-semibold transition ${selectedTab === 'events'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              My Events
            </button>
            <button
              onClick={() => setSelectedTab('bookings')}
              className={`px-6 py-3 font-semibold transition ${selectedTab === 'bookings'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Vendor Bookings
            </button>
            <button
              onClick={() => setSelectedTab('reviews')}
              className={`px-6 py-3 font-semibold transition ${selectedTab === 'reviews'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              My Reviews
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        ) : (
          <>
            {/* Events Tab */}
            {selectedTab === 'events' && (
              <div className="space-y-6">
                {events.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events planned yet</h3>
                    <p className="text-gray-600 mb-6">Start planning your first event!</p>
                    <button
                      onClick={() => navigate('/plan-event')}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                      Plan an Event
                    </button>
                  </div>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-gray-900 text-xl">
                              {eventTypeLabels[event.event_type] || event.event_type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${event.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : event.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">Event #{event.id} · Planned on {new Date(event.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        </div>
                        <div className="text-right mt-4 lg:mt-0">
                          <div className="text-lg font-bold text-orange-600 mb-1">
                            Budget: ₹{event.budget}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">{new Date(event.event_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="w-4 h-4 text-pink-600" />
                          <span className="text-sm">{event.guest_count} guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span className="text-sm">{event.city}, {event.pincode}</span>
                        </div>
                      </div>

                      {/* Services */}
                      {event.services && event.services.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Services Requested:</div>
                          <div className="flex flex-wrap gap-2">
                            {event.services.map((s) => (
                              <span key={s} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                {serviceLabels[s] || s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Requests */}
                      {event.special_requests && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <div className="text-sm font-semibold text-gray-700 mb-1">Special Requests:</div>
                          <p className="text-sm text-gray-600">{event.special_requests}</p>
                        </div>
                      )}

                      {/* Address */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm font-semibold text-gray-700 mb-1">Event Address:</div>
                        <p className="text-sm text-gray-600">{event.address}, {event.city} - {event.pincode}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {selectedTab === 'bookings' && (
              <div className="space-y-6">
                {bookings.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No vendor bookings yet</h3>
                    <p className="text-gray-600">Vendor bookings will appear here once vendors are matched to your events.</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-gray-900 text-xl">{booking.event}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === 'upcoming' || booking.status === 'confirmed'
                              ? 'bg-blue-100 text-blue-700'
                              : booking.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                              }`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-gray-700 font-semibold mb-1">{booking.vendor}</div>
                          <div className="text-sm text-gray-600">Booking ID: {booking.id}</div>
                        </div>
                        <div className="text-right mt-4 lg:mt-0">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            ₹{booking.amount.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">{booking.date ? new Date(booking.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          }) : 'TBD'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-pink-600" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {booking.canReview && (
                          <button
                            onClick={() => openReviewModal(booking)}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                          >
                            <Star className="w-4 h-4" />
                            <span>Write Review</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Reviews</h2>

                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>You haven't written any reviews yet</p>
                    </div>
                  ) : (
                    reviews.map((review) => (
                      <div key={review.id} className="border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{review.vendor_name}</h3>
                            <p className="text-sm text-gray-600">{review.event_name} - {review.event_date ? new Date(review.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</p>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-5 h-5 ${star <= review.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">"{review.comment}"</p>
                      </div>
                    ))
                  )}

                  {pendingReviewCount > 0 && (
                    <div className="text-center py-4 text-gray-500">
                      <p>You have {pendingReviewCount} pending review(s) from completed events</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h2>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vendor
                </label>
                <input
                  type="text"
                  value={reviewData.vendor}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 transition ${star <= reviewData.rating
                          ? 'fill-orange-500 text-orange-500'
                          : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  required
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                  rows={5}
                  placeholder="Share your experience with this vendor..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
