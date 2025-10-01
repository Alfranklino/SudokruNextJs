import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CookiesPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Cookie Policy"
        description="Learn about how we use cookies to improve your experience on Sudokru."
      />
    </VisitorLayout>
  );
}
