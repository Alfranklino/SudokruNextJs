import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function ContactPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Contact Us"
        description="Get in touch with our team for support, partnerships, or any questions."
      />
    </VisitorLayout>
  );
}
