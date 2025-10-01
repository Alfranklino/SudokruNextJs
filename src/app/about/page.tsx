import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function AboutPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="About Us"
        description="Learn more about our mission to revolutionize the world of competitive Sudoku."
      />
    </VisitorLayout>
  );
}
