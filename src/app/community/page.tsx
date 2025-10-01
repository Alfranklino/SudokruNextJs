import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CommunityPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Community"
        description="Join thousands of Sudoku enthusiasts in our vibrant community forum."
      />
      <Footer />
    </>
  );
}
