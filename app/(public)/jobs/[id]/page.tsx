import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, MessagesSquare, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Job {
  posterName: string;
  postalCode: string;
  canton: string;
  title: string;
  description: string;
  tags: string[];
  schedule: string;
  languages: string[];
  postedAt: string;
}

const JOBS: Record<string, Job> = {
  '1': {
    posterName: 'Candle',
    postalCode: '1227 Les Acacias',
    canton: 'GE',
    title: 'Recherche de maman de jour pour notre fille de 2 ans',
    description:
      'Nous cherchons une personne de confiance pour garder notre fille du lundi au vendredi, de 8h à 17h.\n\n' +
      'Nous habitons aux Acacias, à 5 minutes à pied de la gare. Notre fille a 2 ans, elle est calme et parle déjà quelques mots.\n\n' +
      'Français apprécié, anglais OK. Contrat régulier, long terme souhaité. Expérience avec les tout-petits indispensable.\n\n' +
      'Salaire selon convention. Repas fournis. Deux jours de congé par semaine.',
    tags: ['Nanny', 'Childminder', 'Regular'],
    schedule: 'Regular · Full-time',
    languages: ['French', 'English'],
    postedAt: '2 days ago',
  },
  '2': {
    posterName: 'Justine',
    postalCode: '1244 Choulex',
    canton: 'GE',
    title: 'Nounou recherchée pour deux enfants',
    description:
      'Famille à Choulex cherche nounou à temps plein pour deux enfants (4 et 7 ans).\n\n' +
      'Permis de travail requis. Anglais ou français.',
    tags: ['Nanny', 'Regular'],
    schedule: 'Regular · Full-time',
    languages: ['French', 'English'],
    postedAt: '5 days ago',
  },
  '3': {
    posterName: 'Julie',
    postalCode: '1206 Genève',
    canton: 'GE',
    title: 'Recherche nounou — Temps partiel',
    description:
      'Besoin d’aide les mercredis et vendredis après-midi pour notre fils de 4 ans.',
    tags: ['Nanny', 'Part-time'],
    schedule: 'Part-time',
    languages: ['French'],
    postedAt: '1 week ago',
  },
};

export function generateStaticParams() {
  return Object.keys(JOBS).map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const job = JOBS[params.id];
  if (!job) return { title: 'Job not found' };
  return {
    title: job.title,
    description: job.description.slice(0, 150),
  };
}

export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = JOBS[params.id];
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-surface-border">
        <div className="container-page flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-[18px] font-bold text-primary"
          >
            <span aria-hidden className="text-2xl">
              🦋
            </span>
            PinoyCare CH
          </Link>
          <Link
            href="/search/"
            className="flex items-center gap-1 text-small text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </header>

      <div className="container-page grid grid-cols-1 gap-6 py-8 lg:grid-cols-3">
        <article className="card p-6 lg:col-span-2">
          <p className="text-small text-ink-muted">
            <span className="font-medium text-ink">{job.posterName}</span>
            <span className="mx-1.5">·</span>
            {job.postalCode}
            <span className="mx-1.5">·</span>
            {job.postedAt}
          </p>

          <h1 className="mt-2 font-heading text-h2 text-ink">{job.title}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 whitespace-pre-line text-body text-ink">
            {job.description}
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-surface-border pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-small font-medium text-ink-muted">
                Schedule
              </dt>
              <dd className="mt-1 text-body text-ink">{job.schedule}</dd>
            </div>
            <div>
              <dt className="text-small font-medium text-ink-muted">
                Languages
              </dt>
              <dd className="mt-1 text-body text-ink">
                {job.languages.join(', ')}
              </dd>
            </div>
          </dl>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-4">
            <Button className="w-full">
              <MessagesSquare className="h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" className="mt-2 w-full">
              Apply
            </Button>
            <Button variant="ghost" className="mt-2 w-full">
              <Heart className="h-4 w-4" />
              Save to favourites
            </Button>
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-surface-border p-3">
              <MapPin className="h-4 w-4 text-swiss" />
              <span className="text-small text-ink-muted">
                Area · {job.postalCode}
              </span>
            </div>
            <div className="flex h-[200px] items-center justify-center bg-surface-soft p-4 text-center text-small text-ink-muted">
              Canton {job.canton} — map preview coming when connected to
              Supabase
            </div>
          </div>

          <div className="card p-4">
            <p className="text-small text-ink-muted">
              Tip: always meet in a public place and check references before
              agreeing on a job.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
