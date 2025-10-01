import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function PressPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Press"
        description="Media resources, press releases, and contact information for journalists."
      />
    </VisitorLayout>
  );
}
