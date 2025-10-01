import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function AboutPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="About Us"
        description="Learn more about our mission to revolutionize the world of competitive Sudoku."
      />
      <Footer />
    </>
  );
}
