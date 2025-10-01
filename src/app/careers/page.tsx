import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function CareersPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Careers"
        description="Join our team and help build the future of competitive Sudoku gaming."
      />
    </VisitorLayout>
  );
}
