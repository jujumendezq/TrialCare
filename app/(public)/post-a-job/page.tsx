'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  'Babysitting / Nanny',
  'Childminder (maman de jour)',
  'Housekeeping / Cleaning',
  'Au pair',
  'Elderly care (light)',
  'Live-in / Live-out',
];

const SCHEDULES = ['Regular', 'Occasional', 'Full-time', 'Part-time'];

const CANTONS = [
  'AG','AI','AR','BE','BL','BS','FR','GE','GL','GR','JU','LU','NE','NW',
  'OW','SG','SH','SO','SZ','TG','TI','UR','VD','VS','ZG','ZH',
];

export default function PostAJobPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-surface">
        <header className="border-b border-surface-border">
          <div className="container-page flex h-16 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-[18px] font-bold text-primary"
            >
              <span aria-hidden className="text-2xl">
                🦋
              </span>
              PinoyCare CH
            </Link>
          </div>
        </header>
        <div className="container-page max-w-2xl py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 font-heading text-h2 text-ink">
            Job posted!
          </h1>
          <p className="mt-2 text-body text-ink-muted">
            Your listing will appear in search results within a few moments.
            (Demo only — nothing saved yet.)
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href="/search/">View my listing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            href="/"
            className="flex items-center gap-1 text-small text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <div className="container-page max-w-2xl py-8">
        <h1 className="font-heading text-h1 text-ink">Post a job</h1>
        <p className="mt-2 text-body text-ink-muted">
          Tell us what you need. It&apos;s free — and always will be at launch.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="text-small font-medium text-ink"
            >
              Job type
            </label>
            <select
              id="category"
              name="category"
              required
              className="input mt-1 cursor-pointer"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="text-small font-medium text-ink">
              Title
            </label>
            <Input
              id="title"
              name="title"
              required
              placeholder="e.g. Recherche nounou — Temps partiel"
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="text-small font-medium text-ink"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              placeholder="Describe the role, schedule, language preferences, number of children, etc."
              className="input mt-1 min-h-[140px]"
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="postal_code"
                className="text-small font-medium text-ink"
              >
                Postal code
              </label>
              <Input
                id="postal_code"
                name="postal_code"
                required
                placeholder="1200"
                className="mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="canton"
                className="text-small font-medium text-ink"
              >
                Canton
              </label>
              <select
                id="canton"
                name="canton"
                required
                className="input mt-1 cursor-pointer"
              >
                <option value="">Select…</option>
                {CANTONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label
              htmlFor="schedule"
              className="text-small font-medium text-ink"
            >
              Schedule
            </label>
            <select
              id="schedule"
              name="schedule"
              required
              className="input mt-1 cursor-pointer"
            >
              <option value="">Select…</option>
              {SCHEDULES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 border-t border-surface-border pt-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" asChild>
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="submit">Publish job</Button>
          </div>

          <p className="text-[12px] text-ink-muted">
            By posting, you agree to comply with Swiss law and treat workers
            fairly. PinoyCare CH does not verify permits or identities.
          </p>
        </form>
      </div>
    </div>
  );
}
