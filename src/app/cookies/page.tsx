import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CookiesPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Cookie Policy"
        description="Learn about how we use cookies to improve your experience on Sudokru."
      />
      <Footer />
    </>
  );
}
