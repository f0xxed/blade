import { HeroSection } from '@/components/HeroSection';

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
    <div className="min-h-screen">
      <HeroSection
        tagline="Groomed. Poured. Perfected."
        headline="Tampa's Premier Barbershop Meets Neighborhood Bar"
        ctaText="Book Appointment"
        onBookingClick={handleBookingClick}
      />
      {/* Future sections will be added here: Services, About, Instagram, Location, Contact */}
    </div>
  );
}

export default App;
