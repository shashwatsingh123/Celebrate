import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    event: 'Ganesh Chaturthi Pooja',
    rating: 5,
    comment: 'Celebrate made our Ganesh Chaturthi celebration absolutely divine! The pandit was very knowledgeable and all arrangements were perfect. Highly recommended!',
    location: 'Mumbai'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    event: 'Birthday Party',
    rating: 5,
    comment: 'Organized my daughter\'s 5th birthday with Celebrate. The decorators and caterers were exceptional. Everything was hassle-free!',
    location: 'Delhi'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    event: 'Diwali Celebration',
    rating: 5,
    comment: 'The festival celebration package was amazing! From decorations to catering, everything was authentic and beautifully done.',
    location: 'Ahmedabad'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    event: 'Surprise Anniversary',
    rating: 5,
    comment: 'They helped me plan the perfect surprise for my wife. The team was discreet and professional. She was absolutely delighted!',
    location: 'Bangalore'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy customers who made their celebrations memorable with Celebrate
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm mb-4 italic">
                "{testimonial.comment}"
              </p>

              {/* Author Info */}
              <div className="border-t pt-4">
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.event}</div>
                <div className="text-xs text-orange-600 mt-1">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
