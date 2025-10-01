import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function BlogPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Blog"
        description="Stay updated with the latest news, strategies, and updates from the Sudokru community."
      />
      <Footer />
    </>
  );
}
