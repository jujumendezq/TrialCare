'use client';
import { useState } from 'react';
import { ListingCard } from '@/components/listing-card';
import { SearchBar } from '@/components/search-bar';

const RESULTS = [
  {
    id: '1',
    posterName: 'Candle',
    postalCode: '1227 Les Acacias',
    title: 'Recherche de maman de jour pour notre fille de 2 ans',
    description:
      'Nous cherchons une personne de confiance pour garder notre fille du lundi au vendredi, de 8h à 17h.',
    tags: ['Nanny', 'Childminder', 'Regular'],
    thumbnailUrl: null,
  },
  {
    id: '2',
    posterName: 'Justine',
    postalCode: '1244 Choulex',
    title: 'Nounou recherchée pour deux enfants',
    description:
      'Famille à Choulex cherche nounou à temps plein, permis de travail requis.',
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
    thumbnailUrl: null,
  },
];

const JOB_TYPES = [
  'Babysitting / Nanny',
  'Childminder (maman de jour)',
  'Housekeeping / Cleaning',
  'Au pair',
  'Elderly care (light)',
  'Live-in / Live-out',
];

const SCHEDULES = ['Regular', 'Occasional', 'Full-time', 'Part-time'];

const LANGUAGES = ['English', 'French', 'German', 'Italian'];

export default function SearchPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  function toggle(
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-surface-border">
        <div className="container-page flex h-16 items-center">
          <a
            href="/"
            className="flex items-center gap-2 font-heading text-[18px] font-bold text-primary"
          >
            <span aria-hidden className="text-2xl">
              🦋
            </span>
            PinoyCare CH
          </a>
        </div>
      </header>

      <div className="container-page py-6">
        <SearchBar defaultValue="1226 Thônex" defaultRadius="10" />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filter sidebar */}
          <aside className="space-y-4 lg:col-span-1">
            <div className="card p-4">
              <h3 className="font-heading text-h3 text-ink">Job type</h3>
              <ul className="mt-3 space-y-2">
                {JOB_TYPES.map((t) => (
                  <li key={t}>
                    <label className="flex cursor-pointer items-center gap-2 text-small text-ink">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t)}
                        onChange={() =>
                          toggle(t, selectedTypes, setSelectedTypes)
                        }
                        className="h-4 w-4 rounded border-surface-border accent-primary"
                      />
                      {t}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4">
              <h3 className="font-heading text-h3 text-ink">Schedule</h3>
              <ul className="mt-3 space-y-2">
                {SCHEDULES.map((s) => (
                  <li key={s}>
                    <label className="flex cursor-pointer items-center gap-2 text-small text-ink">
                      <input
                        type="checkbox"
                        checked={selectedSchedules.includes(s)}
                        onChange={() =>
                          toggle(s, selectedSchedules, setSelectedSchedules)
                        }
                        className="h-4 w-4 rounded border-surface-border accent-primary"
                      />
                      {s}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4">
              <h3 className="font-heading text-h3 text-ink">Language</h3>
              <ul className="mt-3 space-y-2">
                {LANGUAGES.map((l) => (
                  <li key={l}>
                    <label className="flex cursor-pointer items-center gap-2 text-small text-ink">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(l)}
                        onChange={() =>
                          toggle(l, selectedLanguages, setSelectedLanguages)
                        }
                        className="h-4 w-4 rounded border-surface-border accent-primary"
                      />
                      {l}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Results */}
          <section className="space-y-4 lg:col-span-3">
            <div className="flex items-baseline justify-between">
              <h1 className="font-heading text-h2 text-ink">Search results</h1>
              <p className="text-small text-ink-muted">
                {RESULTS.length} offer{RESULTS.length === 1 ? '' : 's'}
              </p>
            </div>
            {RESULTS.map((r) => (
              <ListingCard key={r.id} {...r} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
