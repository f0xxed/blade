import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactForm } from '@/components/ContactForm';
import { LocationSection } from '@/components/LocationSection';

function App() {
  /**
   * Handle booking CTA click
   * Placeholder implementation - will integrate with booking widget in Epic 3 (Story 3.1)
   */
  const handleBookingClick = () => {
    console.log('Booking initiated - will integrate booking widget in Epic 3');
    // Future: Open booking widget modal or redirect to booking platform
  };

  return (
    <div>
      <HeroSection
        tagline="Groomed. Poured. Perfected."
        headline="Tampa's Premier Barbershop Meets Neighborhood Bar"
        ctaText="Coming Soon!"
        onBookingClick={handleBookingClick}
      />
      <ServicesSection />
      <AboutSection />
      <ContactForm />
      <LocationSection />
      {/* Future sections will be added here: Instagram */}
    </div>
  );
}

export default App;
