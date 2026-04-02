import { Menu, X, Search, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Celebrate
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-gray-700 hover:text-orange-600 transition">Events</a>
            <a href="#vendors" className="text-gray-700 hover:text-orange-600 transition">Vendors</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-orange-600 transition">How It Works</a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition">About</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition">Contact</a>
          </nav>

          {/* Contact & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+911234567890" className="flex items-center text-gray-700 hover:text-orange-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>+91 123 456 7890</span>
            </a>
            <button 
              onClick={() => navigate('/plan-event')}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#events" className="block text-gray-700 hover:text-orange-600 py-2">Events</a>
            <a href="#vendors" className="block text-gray-700 hover:text-orange-600 py-2">Vendors</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-orange-600 py-2">How It Works</a>
            <a href="#about" className="block text-gray-700 hover:text-orange-600 py-2">About</a>
            <a href="#contact" className="block text-gray-700 hover:text-orange-600 py-2">Contact</a>
            <div className="pt-4 space-y-2">
              <a href="tel:+911234567890" className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 123 456 7890</span>
              </a>
              <button 
                onClick={() => navigate('/plan-event')}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}