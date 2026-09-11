'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const TABS = [
  { href: '/dashboard/', label: 'Home' },
  { href: '/dashboard/favourites/', label: 'Favourites' },
  { href: '/dashboard/profile/', label: 'My profile' },
  { href: '/dashboard/views/', label: 'Profile views' },
];

export function TabsNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-surface-border bg-surface">
      <div className="container-page flex gap-6 overflow-x-auto">
        {TABS.map((t) => {
          const active =
            t.href === '/dashboard/'
              ? pathname === '/dashboard' || pathname === '/dashboard/'
              : pathname.startsWith(t.href) ||
                pathname.startsWith(t.href.replace(/\/$/, ''));

          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                'whitespace-nowrap border-b-2 py-3 text-body transition-colors',
                active
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-ink-muted hover:text-ink'
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
