import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function TermsPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Terms of Service"
        description="Read our terms and conditions for using Sudokru platform."
      />
    </VisitorLayout>
  );
}
