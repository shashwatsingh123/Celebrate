import { UtensilsCrossed, Camera, Users, Music, Shirt, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const vendorServices = [
  {
    id: 1,
    name: 'Caterers',
    description: 'Professional catering services with authentic Indian cuisine and diverse menu options',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXRlcmluZyUyMGZvb2QlMjBpbmRpYXxlbnwxfHx8fDE3NzE5OTM0OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: UtensilsCrossed,
    vendors: '150+',
    color: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Photographers',
    description: 'Capture every precious moment with skilled professional photographers',
    image: 'https://images.unsplash.com/photo-1643968612613-fd411aecd1fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxOTQyMDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Camera,
    vendors: '100+',
    color: 'bg-pink-500'
  },
  {
    id: 3,
    name: 'Pandits',
    description: 'Experienced pandits for all traditional ceremonies and religious events',
    image: 'https://images.unsplash.com/photo-1703173342540-fba340054867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwcmllc3QlMjBwYW5kaXQlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NzE5OTM0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Users,
    vendors: '80+',
    color: 'bg-purple-500'
  }
];

const additionalServices = [
  { icon: Music, name: 'Entertainment & DJ', count: '75+' },
  { icon: Shirt, name: 'Decorators', count: '120+' },
  { icon: Gift, name: 'Gift & Favors', count: '60+' }
];

export function VendorServices() {
  return (
    <section id="vendors" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Professional Vendors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified and experienced professionals for all your event needs
          </p>
        </div>

        {/* Main Vendor Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {vendorServices.map((vendor) => {
            const IconComponent = vendor.icon;
            return (
              <div 
                key={vendor.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback 
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Vendor Count Badge */}
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-gray-900">{vendor.vendors}</span>
                    <span className="text-gray-600 text-sm ml-1">Vendors</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`inline-flex items-center gap-2 ${vendor.color} text-white px-4 py-2 rounded-full mb-3`}>
                      <IconComponent className="w-5 h-5" />
                      <span className="font-semibold">{vendor.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    {vendor.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    Browse {vendor.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            More Services Available
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:shadow-md transition cursor-pointer"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-lg text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-600">{service.count} vendors</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
