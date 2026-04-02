import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { EventCategories } from '../components/EventCategories';
import { VendorServices } from '../components/VendorServices';
import { FeaturedVendors } from '../components/FeaturedVendors';
import { HowItWorks } from '../components/HowItWorks';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <EventCategories />
      <VendorServices />
      <FeaturedVendors />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
