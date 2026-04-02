import { Search, Users, CheckCircle, PartyPopper } from 'lucide-react';
import { useNavigate } from 'react-router';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Search & Discover',
    description: 'Browse through our extensive catalog of vendors and services tailored to your event needs',
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 2,
    icon: Users,
    title: 'Compare & Connect',
    description: 'Compare prices, read reviews, and connect directly with verified professionals',
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 3,
    icon: CheckCircle,
    title: 'Book & Customize',
    description: 'Book your preferred vendors and customize your event package according to your requirements',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 4,
    icon: PartyPopper,
    title: 'Celebrate!',
    description: 'Sit back and enjoy your perfectly planned event while we handle all the details',
    color: 'from-green-500 to-teal-500'
  }
];

export function HowItWorks() {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Planning your dream event is just four simple steps away
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Connector Line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-pink-300"></div>
                )}

                {/* Card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white`}>
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/plan-event')}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Planning Your Event
          </button>
        </div>
      </div>
    </section>
  );
}