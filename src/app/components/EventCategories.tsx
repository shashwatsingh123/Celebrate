import { Sparkles, Cake, PartyPopper, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';

const eventCategories = [
  {
    id: 1,
    name: 'Pooja Ceremonies',
    description: 'Traditional religious ceremonies with experienced pandits and all necessary arrangements',
    image: 'https://images.unsplash.com/photo-1646137148895-425961f5bcd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHBvb2phJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzcxOTkzNDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Sparkles,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 2,
    name: 'Birthday Parties',
    description: 'Make birthdays special with decorations, entertainment, and personalized planning',
    image: 'https://images.unsplash.com/photo-1612145463153-e97c1774fe2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMHBhcnR5JTIwZGVjb3JhdGlvbiUyMGluZGlhfGVufDF8fHx8MTc3MTk5MzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Cake,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 3,
    name: 'Festival Celebrations',
    description: 'Celebrate Diwali, Holi, Navratri and more with authentic decorations and services',
    image: 'https://images.unsplash.com/photo-1635564981692-857482d9325f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbCUyMGNlbGVicmF0aW9uJTIwZGl3YWxpfGVufDF8fHx8MTc3MTk5MzQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Star,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 4,
    name: 'Surprise Parties',
    description: 'Create memorable surprises with our discrete planning and execution services',
    image: 'https://images.unsplash.com/photo-1770806630106-f3319f9d4ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMGRlY29yYXRpb24lMjBiYWxsb29ucyUyMHBhcnR5fGVufDF8fHx8MTc3MTk5MzQ5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: PartyPopper,
    color: 'from-green-500 to-teal-500'
  }
];

export function EventCategories() {
  const navigate = useNavigate();

  return (
    <section id="events" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Event
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whatever the occasion, we have everything you need to make it extraordinary
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className={`absolute top-4 right-4 p-3 rounded-full bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <button 
                    onClick={() => navigate(`/explore/${category.name.toLowerCase().replace(/ /g, '-')}`)}
                    className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent hover:underline`}
                  >
                    Explore Services →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}