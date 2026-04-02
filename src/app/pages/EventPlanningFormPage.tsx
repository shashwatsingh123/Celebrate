import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Users, IndianRupee, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createEvent } from '../../api/events';

export function EventPlanningFormPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    address: '',
    city: '',
    pincode: '',
    services: [] as string[],
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login first to plan an event.');
      navigate('/customer-login');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createEvent(formData);
      alert('🎉 Event plan submitted successfully! We will match you with the perfect vendors.');
      navigate('/customer-dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Plan Your Event</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Let's Create Something Magical
            </h1>
            <p className="text-gray-600">
              Fill in the details and we'll match you with the perfect vendors
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Step {step} of 3</span>
              <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Event Details */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type of Event *
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                  >
                    <option value="">Select event type</option>
                    <option value="pooja">Pooja Ceremony</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="festival">Festival Celebration</option>
                    <option value="surprise">Surprise Party</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        required
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                        placeholder="Number of guests"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      required
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    >
                      <option value="">Select budget range</option>
                      <option value="10000-25000">₹10,000 - ₹25,000</option>
                      <option value="25000-50000">₹25,000 - ₹50,000</option>
                      <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                      <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                      <option value="200000+">₹2,00,000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Continue to Services
                </button>
              </div>
            )}

            {/* Step 2: Services Selection */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Services You Need</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'catering', name: 'Catering Services', desc: 'Professional food & beverage' },
                    { id: 'photography', name: 'Photography', desc: 'Capture special moments' },
                    { id: 'pandit', name: 'Pandit Services', desc: 'For religious ceremonies' },
                    { id: 'decoration', name: 'Decoration', desc: 'Beautiful event setup' },
                    { id: 'entertainment', name: 'Entertainment & DJ', desc: 'Music and performances' },
                    { id: 'gifts', name: 'Gift & Favors', desc: 'Return gifts for guests' },
                    { id: 'venue', name: 'Venue Booking', desc: 'Find perfect location' },
                    { id: 'transport', name: 'Transportation', desc: 'Guest transportation' },
                  ].map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-xl border-2 text-left transition ${formData.services.includes(service.id)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{service.name}</span>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.services.includes(service.id)
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-gray-300'
                          }`}>
                          {formData.services.includes(service.id) && (
                            <span className="text-white text-sm">✓</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Continue to Address
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Address & Special Requests */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Location & Additional Details</h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Complete Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      rows={3}
                      placeholder="House/Flat No., Street, Landmark"
                    ></textarea>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="Enter city name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition"
                    rows={4}
                    placeholder="Any specific requirements, dietary restrictions, theme preferences, etc."
                  ></textarea>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Our team will contact you within 24 hours to discuss your requirements and provide vendor recommendations based on your preferences and budget.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Submit Event Plan
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
