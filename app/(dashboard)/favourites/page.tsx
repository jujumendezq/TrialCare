'use client';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { ListingCard } from '@/components/listing-card';

export default function FavouritesPage() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          if (!cancelled) setLoading(false);
          return;
        }

        const { data } = await supabase
          .from('favourites')
          .select('job_id, jobs(*)')
          .eq('user_id', user.id);

        const mapped =
          data?.map((row: any) => ({
            id: row.jobs.id,
            posterName: 'Family',
            postalCode: row.jobs.postal_code ?? '',
            title: row.jobs.title,
            description: row.jobs.description,
            tags: [row.jobs.category],
            thumbnailUrl: null,
            initialFavourited: true,
          })) ?? [];

        if (!cancelled) setJobs(mapped);
      } catch {
        // env not configured
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 fill-accent text-accent" />
        <h1 className="font-heading text-h2 text-ink">Favourites</h1>
      </div>

      {loading ? (
        <div className="mt-4 space-y-4">
          <div className="card h-[152px] animate-pulse bg-surface" />
          <div className="card h-[152px] animate-pulse bg-surface" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="card mt-4 p-6 text-center text-body text-ink-muted">
          You haven&apos;t saved any jobs yet. Tap the ♡ on a listing to save
          it.
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {jobs.map((job) => (
            <ListingCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
}
