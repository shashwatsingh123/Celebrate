import { Search } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Make Every <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">Celebration</span> Unforgettable
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-4">
              Your one-stop marketplace for all event needs in India. From Poojas to Birthday Parties, Festivals to Surprise Celebrations - we connect you with the best vendors and services.
            </p>
            <p className="text-md lg:text-lg text-orange-600 font-semibold mb-8 italic">
              "We are here, So you can enjoy your moments hassle free"
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto lg:mx-0 bg-white rounded-full shadow-lg p-2 flex items-center">
              <Search className="w-5 h-5 text-gray-400 ml-4" />
              <input 
                type="text" 
                placeholder="Search for events, vendors, or services..."
                className="flex-1 px-4 py-3 outline-none"
              />
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition">
                Search
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => navigate('/plan-event')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Start Planning Your Event
              </button>
              <button 
                onClick={() => navigate('/customer-login')}
                className="bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition"
              >
                Customer Login
              </button>
              <button 
                onClick={() => navigate('/vendor-login')}
                className="bg-white text-purple-600 border-2 border-purple-500 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition"
              >
                Vendor Login
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <div className="text-3xl font-bold text-orange-600">500+</div>
                <div className="text-gray-600 text-sm">Vendors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">10k+</div>
                <div className="text-gray-600 text-sm">Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">50k+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1771769076330-c424547f5c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzE5Nzc0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Colorful Indian Celebration"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}