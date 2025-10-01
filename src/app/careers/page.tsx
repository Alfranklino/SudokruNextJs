import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CareersPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Careers"
        description="Join our team and help build the future of competitive Sudoku gaming."
      />
      <Footer />
    </>
  );
}
