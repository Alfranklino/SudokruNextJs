import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CommunityPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Community"
        description="Join thousands of Sudoku enthusiasts in our vibrant community forum."
      />
    </VisitorLayout>
  );
}
