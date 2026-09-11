import { TopNav } from '@/components/top-nav';
import { TabsNav } from '@/components/tabs-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-soft">
      <TopNav />
      <TabsNav />
      <main className="container-page py-8">{children}</main>
    </div>
  );
}
