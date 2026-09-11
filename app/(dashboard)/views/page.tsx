'use client';
import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function ViewsPage() {
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState<any[]>([]);

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
          .from('profile_views')
          .select('*, profiles!profile_views_viewer_id_fkey(full_name, photo_url)')
          .eq('viewed_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);

        if (!cancelled) setViews(data ?? []);
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
        <Eye className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-h2 text-ink">Profile views</h1>
      </div>

      {loading ? (
        <div className="mt-4 space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card h-16 animate-pulse bg-surface"
            />
          ))}
        </div>
      ) : views.length === 0 ? (
        <div className="card mt-4 p-6 text-center text-body text-ink-muted">
          Wala pang views dito — share your profile to get noticed!
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {views.map((v) => (
            <li key={v.id} className="card flex items-center gap-3 p-4">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-surface-soft">
                {v.profiles?.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.profiles.photo_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body font-medium text-ink">
                  {v.profiles?.full_name ?? 'Someone'}
                </p>
                <p className="text-small text-ink-muted">
                  {new Date(v.created_at).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
