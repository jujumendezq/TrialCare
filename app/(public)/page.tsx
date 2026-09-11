import Link from 'next/link';
import { ShieldCheck, MessagesSquare, Star } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';
import { ListingCard } from '@/components/listing-card';
import { Button } from '@/components/ui/button';

const FEATURED = [
  {
    id: '1',
    posterName: 'Candle',
    postalCode: '1227 Les Acacias',
    title: 'Recherche de maman de jour pour notre fille de 2 ans',
    description:
      'Nous cherchons une personne de confiance pour garder notre fille du lundi au vendredi, de 8h à 17h. Français apprécié.',
    tags: ['Nanny', 'Childminder', 'Regular'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=240&fit=crop',
  },
  {
    id: '2',
    posterName: 'Justine',
    postalCode: '1244 Choulex',
    title: 'Nounou recherchée pour deux enfants',
    description:
      'Famille à Choulex cherche nounou à temps plein, permis de travail requis. Anglais ou français.',
    tags: ['Nanny', 'Regular'],
    thumbnailUrl: null,
  },
  {
    id: '3',
    posterName: 'Julie',
    postalCode: '1206 Genève',
    title: 'Recherche nounou — Temps partiel',
    description:
      'Besoin d’aide les mercredis et vendredis après-midi pour notre fils de 4 ans.',
    tags: ['Nanny', 'Part-time'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="container-page flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span aria-hidden className="text-2xl">
            🦋
          </span>
          <span className="font-heading text-[18px] font-bold text-primary">
            PinoyCare CH
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login/">Log in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register/">Sign up</Link>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="container-page py-12 text-center">
        <h1 className="mx-auto max-w-3xl font-heading text-h1 text-ink md:text-[40px] md:leading-[48px]">
          Find trusted babysitters &amp; housekeepers in Switzerland
        </h1>
        <p className="mt-3 text-body text-ink-muted">
          Free for Filipino families and workers
        </p>

        <div className="mx-auto mt-6 max-w-3xl">
          <SearchBar />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/search/">I&apos;m looking for a babysitter</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/dashboard/profile/">I&apos;m offering my services</Link>
          </Button>
        </div>

        {/* Free banner */}
        <div className="mx-auto mt-8 max-w-2xl rounded-card border border-primary/20 bg-primary/5 px-4 py-3 text-small text-primary">
          PinoyCare CH is 100% free — built by kababayan, for kababayan.
        </div>
      </section>

      {/* Featured jobs */}
      <section className="container-page py-8">
        <h2 className="font-heading text-h2 text-ink">Featured job offers</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURED.map((job) => (
            <ListingCard key={job.id} {...job} />
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-page py-8">
        <div className="card grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <TrustItem
            icon={<ShieldCheck className="h-5 w-5 text-primary" />}
            title="Verified profiles"
            body="Community-reviewed caregivers across all 26 cantons."
          />
          <TrustItem
            icon={<MessagesSquare className="h-5 w-5 text-primary" />}
            title="Free messaging"
            body="Talk directly — no fees, no paywall, now or ever at launch."
          />
          <TrustItem
            icon={<Star className="h-5 w-5 text-warm" />}
            title="Community reviews"
            body="Real feedback from real families and workers."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-surface-border bg-surface-soft">
        <div className="container-page flex flex-col gap-4 py-8 text-small text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PinoyCare CH — pinoycare.ch</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/about/" className="hover:text-ink">
              About
            </Link>
            <Link href="/contact/" className="hover:text-ink">
              Contact
            </Link>
            <Link href="/terms/" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/datenschutz/" className="hover:text-ink">
              Datenschutz
            </Link>
            <Link href="/impressum/" className="hover:text-ink">
              Impressum
            </Link>
          </nav>
        </div>
        <div className="container-page pb-8 text-[12px] text-ink-muted">
          PinoyCare CH does not verify work permits. Users are responsible for
          complying with Swiss law.
        </div>
      </footer>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-full bg-surface-soft p-2">{icon}</div>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-small text-ink-muted">{body}</p>
      </div>
    </div>
  );
}
