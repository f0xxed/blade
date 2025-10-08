import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { AboutSection } from '@/components/AboutSection';

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
        ctaText="Book Appointment"
        onBookingClick={handleBookingClick}
      />
      <ServicesSection />
      <AboutSection />
      {/* Future sections will be added here: Instagram, Location, Contact */}
    </div>
  );
}

export default App;
