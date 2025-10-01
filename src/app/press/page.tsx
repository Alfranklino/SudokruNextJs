import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function PressPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Press"
        description="Media resources, press releases, and contact information for journalists."
      />
      <Footer />
    </>
  );
}
