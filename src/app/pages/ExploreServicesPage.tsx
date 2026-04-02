import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Check, Star, IndianRupee } from 'lucide-react';
import { useState } from 'react';

// Service data for different event types
const eventServicesData: Record<string, any> = {
  'pooja-ceremonies': {
    title: 'Pooja Ceremony Services',
    tagline: 'Traditional ceremonies made divine and memorable',
    services: [
      {
        name: 'Pandit Services',
        description: 'Experienced pandits for all traditional ceremonies',
        packages: [
          { name: 'Basic Pooja', price: 2100, features: ['1 Hour', 'Basic Mantras', 'Simple Setup'] },
          { name: 'Standard Pooja', price: 5100, features: ['2-3 Hours', 'Complete Rituals', 'Pooja Samagri Included', 'Basic Decoration'] },
          { name: 'Premium Pooja', price: 11000, features: ['Full Day', 'Elaborate Rituals', 'Premium Samagri', 'Complete Setup', 'Multiple Pandits'] },
        ]
      },
      {
        name: 'Pooja Samagri & Materials',
        description: 'All required materials for traditional ceremonies',
        packages: [
          { name: 'Basic Kit', price: 1500, features: ['Essential Items', 'For 10-15 People', 'Standard Quality'] },
          { name: 'Complete Kit', price: 3500, features: ['All Required Items', 'For 25-30 People', 'Premium Quality', 'Decorative Items'] },
          { name: 'Deluxe Kit', price: 7500, features: ['Premium Items', 'For 50+ People', 'Brass Utensils', 'Decorative Setup'] },
        ]
      },
      {
        name: 'Traditional Catering',
        description: 'Authentic vegetarian satvik food',
        packages: [
          { name: 'Prasad Only', price: 1200, features: ['Per 50 People', 'Sweet Prasad', 'Fresh Preparation'] },
          { name: 'Light Meal', price: 350, features: ['Per Person', '2-3 Dishes', 'Prasad Included', 'Fruits'] },
          { name: 'Full Bhojan', price: 550, features: ['Per Person', '5-6 Dishes', 'Sweets', 'Traditional Thali'] },
        ]
      },
      {
        name: 'Decoration & Setup',
        description: 'Traditional mandap and venue decoration',
        packages: [
          { name: 'Basic Setup', price: 3500, features: ['Mandap Setup', 'Flower Decoration', 'Basic Rangoli'] },
          { name: 'Standard Decoration', price: 8500, features: ['Elaborate Mandap', 'Premium Flowers', 'LED Lights', 'Rangoli Art'] },
          { name: 'Premium Decoration', price: 18000, features: ['Grand Mandap', 'Designer Flowers', 'Complete Lighting', 'Theme Setup'] },
        ]
      }
    ]
  },
  'birthday-parties': {
    title: 'Birthday Party Services',
    tagline: 'Make every birthday a celebration to remember',
    services: [
      {
        name: 'Party Decoration',
        description: 'Themed decorations and balloon arrangements',
        packages: [
          { name: 'Basic Package', price: 4500, features: ['Balloon Decoration', 'Happy Birthday Banner', 'Table Setup', 'Basic Props'] },
          { name: 'Standard Package', price: 9500, features: ['Theme Decoration', 'Balloon Arch', 'Photo Booth', 'Stage Setup', 'Props'] },
          { name: 'Premium Package', price: 22000, features: ['Designer Theme', 'Grand Setup', 'LED Lights', 'Photo & Video Props', 'Name Customization'] },
        ]
      },
      {
        name: 'Birthday Catering',
        description: 'Delicious food options for all ages',
        packages: [
          { name: 'Kids Menu', price: 350, features: ['Per Child', 'Pizza/Burger', 'Fries', 'Juice', 'Ice Cream'] },
          { name: 'Standard Menu', price: 450, features: ['Per Person', 'Snacks', 'Main Course', 'Dessert', 'Beverages'] },
          { name: 'Premium Buffet', price: 750, features: ['Per Person', 'Live Counters', 'Multi-Cuisine', 'Premium Desserts', 'Welcome Drinks'] },
        ]
      },
      {
        name: 'Entertainment',
        description: 'Fun activities and performances',
        packages: [
          { name: 'Games & Activities', price: 5500, features: ['2 Hours', 'Host/Anchor', '5-6 Games', 'Music System'] },
          { name: 'Magic Show', price: 8500, features: ['1 Hour Show', 'Professional Magician', 'Interactive Session'] },
          { name: 'Complete Entertainment', price: 18000, features: ['3-4 Hours', 'DJ', 'Games', 'Character Performance', 'Photo Booth'] },
        ]
      },
      {
        name: 'Cake & Desserts',
        description: 'Designer cakes and sweet treats',
        packages: [
          { name: 'Basic Cake', price: 800, features: ['1 Kg', 'Standard Flavors', 'Simple Design'] },
          { name: 'Designer Cake', price: 2500, features: ['2 Kg', 'Theme Design', 'Premium Flavors', 'Edible Prints'] },
          { name: 'Premium Package', price: 5500, features: ['3 Kg Multi-tier', 'Custom Design', 'Fondant Work', 'Dessert Table'] },
        ]
      }
    ]
  },
  'festival-celebrations': {
    title: 'Festival Celebration Services',
    tagline: 'Celebrate Indian festivals with traditional grandeur',
    services: [
      {
        name: 'Festival Decoration',
        description: 'Traditional and contemporary decorations',
        packages: [
          { name: 'Home Decoration', price: 5500, features: ['Entrance Decor', 'Rangoli', 'Lights', 'Flower Decoration'] },
          { name: 'Community Setup', price: 15000, features: ['Large Area Setup', 'Theme Decoration', 'Lighting', 'Stage Setup'] },
          { name: 'Grand Celebration', price: 35000, features: ['Complete Venue', 'Designer Setup', 'LED & Laser Lights', 'Professional Team'] },
        ]
      },
      {
        name: 'Festive Catering',
        description: 'Traditional festival special cuisine',
        packages: [
          { name: 'Snacks & Sweets', price: 250, features: ['Per Person', 'Festival Sweets', 'Namkeen', 'Tea/Coffee'] },
          { name: 'Traditional Feast', price: 500, features: ['Per Person', 'Authentic Dishes', 'Sweets', 'Complete Meal'] },
          { name: 'Grand Feast', price: 850, features: ['Per Person', 'Multi-regional Cuisine', 'Live Counters', 'Premium Sweets'] },
        ]
      },
      {
        name: 'Cultural Programs',
        description: 'Traditional performances and activities',
        packages: [
          { name: 'Basic Program', price: 12000, features: ['2 Hours', 'Traditional Dance/Music', 'Sound System'] },
          { name: 'Cultural Evening', price: 25000, features: ['3-4 Hours', 'Multiple Performances', 'Professional Artists', 'Complete Setup'] },
          { name: 'Grand Festival', price: 55000, features: ['Full Day', 'Celebrity Artists', 'Stage & Lights', 'Professional Management'] },
        ]
      }
    ]
  },
  'surprise-parties': {
    title: 'Surprise Party Services',
    tagline: 'Create unforgettable moments of joy',
    services: [
      {
        name: 'Surprise Setup',
        description: 'Discreet planning and execution',
        packages: [
          { name: 'Basic Surprise', price: 6500, features: ['Room Decoration', 'Balloon Setup', 'Cake Arrangement', 'Music'] },
          { name: 'Standard Surprise', price: 15000, features: ['Complete Setup', 'Photography', 'Special Entry', 'Gift Hamper'] },
          { name: 'Grand Surprise', price: 35000, features: ['Elaborate Planning', 'Multiple Locations', 'Video Recording', 'Custom Theme'] },
        ]
      },
      {
        name: 'Special Arrangements',
        description: 'Romantic and memorable setups',
        packages: [
          { name: 'Candlelight Dinner', price: 8500, features: ['2 People', 'Romantic Setup', '3-Course Meal', 'Music'] },
          { name: 'Proposal Setup', price: 18000, features: ['Special Decoration', 'Photography', 'Flower Arrangements', 'Complete Planning'] },
          { name: 'Complete Package', price: 45000, features: ['Grand Setup', 'Photo & Video', 'Live Music', 'Luxury Arrangements'] },
        ]
      }
    ]
  }
};

export function ExploreServicesPage() {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<Record<string, string>>({});

  const eventData = eventServicesData[eventType || ''];

  if (!eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Type Not Found</h1>
          <button onClick={() => navigate('/')} className="text-orange-600 hover:underline">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    navigate('/plan-event');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {eventData.title}
          </h1>
          <p className="text-xl text-orange-600 italic font-semibold">
            "{eventData.tagline}"
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12">
          {eventData.services.map((service: any, serviceIndex: number) => (
            <div key={serviceIndex} className="bg-white rounded-3xl shadow-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {service.packages.map((pkg: any, pkgIndex: number) => {
                  const isSelected = selectedServices[service.name] === pkg.name;
                  return (
                    <div
                      key={pkgIndex}
                      className={`border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 shadow-lg'
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedServices({...selectedServices, [service.name]: pkg.name})}
                    >
                      {/* Package Name */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-3xl font-bold text-orange-600">
                          <IndianRupee className="w-7 h-7" />
                          <span>{pkg.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Select Button */}
                      <button
                        className={`w-full py-3 rounded-xl font-semibold transition ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Package'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event?</h2>
          <p className="text-lg mb-6 opacity-90">
            Our team will help you customize these packages according to your needs
          </p>
          <button
            onClick={handleBookNow}
            className="bg-white text-orange-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Book Now & Get Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
