import { useState } from 'react';
import { Star, MapPin, Award, X, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const featuredVendors = [
  {
    id: 1,
    name: 'Raj Caterers',
    category: 'Catering',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    reviews: 234,
    verified: true,
    specialties: ['North Indian', 'South Indian', 'Continental'],
    price: '₹₹₹',
    phone: '+91 98765 43210',
    email: 'rajcaterers@gmail.com',
    experience: '12 years',
    bio: 'Raj Caterers brings over a decade of culinary excellence to your events. Specializing in authentic North & South Indian cuisine, we serve everything from intimate family poojas to grand wedding receptions with 1000+ guests.',
    packages: [
      { name: 'Basic', price: '₹350/plate', desc: 'Buffet with 8 items' },
      { name: 'Premium', price: '₹600/plate', desc: 'Buffet with 15 items + live counters' },
      { name: 'Royal', price: '₹1000/plate', desc: 'Full-course with 25+ items & live stations' },
    ]
  },
  {
    id: 2,
    name: 'Moments Photography',
    category: 'Photography',
    location: 'Delhi NCR',
    rating: 4.8,
    reviews: 189,
    verified: true,
    specialties: ['Wedding', 'Events', 'Candid'],
    price: '₹₹',
    phone: '+91 91234 56789',
    email: 'hello@momentsphotography.in',
    experience: '8 years',
    bio: 'We capture the emotions, the laughter, and the tears of joy. Moments Photography is a team of passionate visual storytellers specializing in candid wedding and event photography across India.',
    packages: [
      { name: 'Essential', price: '₹15,000', desc: '4 hours coverage + 100 edited photos' },
      { name: 'Premium', price: '₹35,000', desc: 'Full day + drone shots + 300 photos + video' },
      { name: 'Cinematic', price: '₹75,000', desc: 'Multi-day + cinematic film + album + drone' },
    ]
  },
  {
    id: 3,
    name: 'Pandit Sharma Ji',
    category: 'Pandit Services',
    location: 'Pune, Maharashtra',
    rating: 5.0,
    reviews: 156,
    verified: true,
    specialties: ['Pooja', 'Vivah', 'Griha Pravesh'],
    price: '₹',
    phone: '+91 87654 32109',
    email: 'sharmaji.pandit@gmail.com',
    experience: '25 years',
    bio: 'With 25 years of experience in conducting Vedic rituals, Pandit Sharma Ji performs all types of Hindu ceremonies with authentic mantras and proper vidhi. Known for explaining each ritual\'s significance to the family.',
    packages: [
      { name: 'Simple Pooja', price: '₹2,100', desc: 'Basic pooja with samagri' },
      { name: 'Elaborate Pooja', price: '₹5,100', desc: 'Extended pooja with full samagri & prasad' },
      { name: 'Grand Ceremony', price: '₹11,000', desc: 'Complete vivah/griha pravesh vidhi' },
    ]
  },
  {
    id: 4,
    name: 'Dream Decorators',
    category: 'Decoration',
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    reviews: 298,
    verified: true,
    specialties: ['Theme Parties', 'Traditional', 'Modern'],
    price: '₹₹',
    phone: '+91 76543 21098',
    email: 'info@dreamdecorators.in',
    experience: '10 years',
    bio: 'Dream Decorators transforms any venue into a magical space. From traditional flower mandaps to modern LED-lit theme parties, we bring your vision to life with meticulous attention to detail.',
    packages: [
      { name: 'Basic', price: '₹8,000', desc: 'Balloon & ribbon setup for small venues' },
      { name: 'Elegant', price: '₹25,000', desc: 'Flower arrangements + lighting + drapes' },
      { name: 'Luxury', price: '₹60,000', desc: 'Full venue transformation with theme design' },
    ]
  }
];

export function FeaturedVendors() {
  const [selectedVendor, setSelectedVendor] = useState<typeof featuredVendors[0] | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Vendors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Top-rated professionals trusted by thousands of happy customers
          </p>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{vendor.category}</p>
                </div>
                {vendor.verified && (
                  <div className="bg-green-100 text-green-700 p-2 rounded-full" title="Verified Vendor">
                    <Award className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center bg-orange-500 text-white px-2 py-1 rounded-md">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="font-semibold text-sm">{vendor.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({vendor.reviews} reviews)</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{vendor.location}</span>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="font-bold text-gray-900">{vendor.price}</span>
                <button
                  onClick={() => setSelectedVendor(vendor)}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-white border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition">
            View All Vendors
          </button>
        </div>
      </div>

      {/* Vendor Profile Popup Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVendor(null)}>
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-t-3xl p-8 text-white relative">
              <button
                onClick={() => setSelectedVendor(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <span className="text-3xl font-bold">{selectedVendor.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
                  <p className="text-white/80">{selectedVendor.category}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{selectedVendor.rating}</span>
                  <span className="text-white/80 text-sm">({selectedVendor.reviews} reviews)</span>
                </div>
                {selectedVendor.verified && (
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedVendor.experience} experience</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* About */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">{selectedVendor.bio}</p>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.specialties.map((s, i) => (
                    <span key={i} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span>{selectedVendor.location}</span>
              </div>

              {/* Packages */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Packages</h3>
                <div className="grid gap-3">
                  {selectedVendor.packages.map((pkg, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div>
                        <div className="font-semibold text-gray-900">{pkg.name}</div>
                        <div className="text-sm text-gray-600">{pkg.desc}</div>
                      </div>
                      <div className="font-bold text-orange-600 whitespace-nowrap ml-4">{pkg.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Phone className="w-4 h-4 text-orange-600" />
                    </div>
                    <a href={`tel:${selectedVendor.phone}`} className="text-gray-700 hover:text-orange-600 transition">{selectedVendor.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <Mail className="w-4 h-4 text-pink-600" />
                    </div>
                    <a href={`mailto:${selectedVendor.email}`} className="text-gray-700 hover:text-orange-600 transition">{selectedVendor.email}</a>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
