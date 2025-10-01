import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function PrivacyPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information."
      />
    </VisitorLayout>
  );
}
