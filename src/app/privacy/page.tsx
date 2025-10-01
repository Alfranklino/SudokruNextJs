import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function PrivacyPage() {
  return (
    <>
      <Navbar variant="visitor" enableScrollChange={false} />
      <div className="h-16" />
      <ComingSoon
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information."
      />
      <Footer />
    </>
  );
}
