import { VisitorLayout } from '@/components/layout/VisitorLayout';
import { ComingSoon } from '@/components/layout/ComingSoon';

export default function HelpPage() {
  return (
    <VisitorLayout>
      <ComingSoon
        title="Help Center"
        description="Find answers to common questions and get support for your Sudokru account."
      />
    </VisitorLayout>
  );
}
