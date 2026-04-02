import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Celebrate
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted marketplace for planning unforgettable events across India. Making celebrations memorable since 2020.
            </p>
            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#events" className="text-gray-400 hover:text-orange-500 transition">Browse Events</a></li>
              <li><a href="#vendors" className="text-gray-400 hover:text-orange-500 transition">Find Vendors</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-orange-500 transition">How It Works</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Careers</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Event Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Pooja Ceremonies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Birthday Parties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Festival Celebrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Surprise Parties</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Corporate Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition">Wedding Planning</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="about">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  VIT Chennai University<br />
                  Vandalur - Kelambakkam Road<br />
                  Chennai - 600127, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-orange-500 transition">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@celebrate.in" className="text-gray-400 hover:text-orange-500 transition">
                  info@celebrate.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Celebrate. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
