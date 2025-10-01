import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function BlogPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Blog"
        description="Stay updated with the latest news, strategies, and updates from the Sudokru community."
      />
    </VisitorLayout>
  );
}
