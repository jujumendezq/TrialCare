'use client';
import Link from 'next/link';
import { Heart, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface ListingCardProps {
  id: string;
  posterName: string;
  postalCode: string;
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl?: string | null;
  initialFavourited?: boolean;
  onToggleFavourite?: (id: string, next: boolean) => void;
}

export function ListingCard({
  id,
  posterName,
  postalCode,
  title,
  description,
  tags,
  thumbnailUrl,
  initialFavourited = false,
  onToggleFavourite,
}: ListingCardProps) {
  const [fav, setFav] = useState(initialFavourited);

  function handleFav(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !fav;
    setFav(next);
    onToggleFavourite?.(id, next);
  }

  return (
    <Link
      href={`/jobs/${id}/`}
      className="card block p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex gap-4">
        <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-card bg-surface-soft">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-muted">
              <ImageOff className="h-8 w-8" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-small text-ink-muted">
              <span className="font-medium text-ink">{posterName}</span>
              <span className="mx-1.5">·</span>
              {postalCode}
            </p>
            <button
              type="button"
              aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
              onClick={handleFav}
              className="rounded-full p-1 transition-colors hover:bg-surface-soft"
            >
              <Heart
                className={cn(
                  'h-5 w-5 transition-colors',
                  fav ? 'fill-accent text-accent' : 'text-ink-muted'
                )}
              />
            </button>
          </div>

          <h3 className="mt-1 line-clamp-2 font-medium text-primary">
            {title}
          </h3>
          <p className="mt-1 line-clamp-3 text-small text-ink-muted">
            {description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
