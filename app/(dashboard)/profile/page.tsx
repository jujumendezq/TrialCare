'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileVisibilityWidget } from '@/components/sidebar/profile-visibility';
import { ReviewsWidget } from '@/components/sidebar/reviews';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [form, setForm] = useState({
    full_name: '',
    bio: '',
    postal_code: '',
    canton: '',
    languages: '',
    job_types: '',
  });

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
        setUserId(user.id);

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (!cancelled && data) {
          setForm({
            full_name: data.full_name ?? '',
            bio: data.bio ?? '',
            postal_code: data.postal_code ?? '',
            canton: data.canton ?? '',
            languages: (data.languages ?? []).join(', '),
            job_types: (data.job_types ?? []).join(', '),
          });
        }
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

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setSaved(false);

    try {
      const supabase = createClient();
      await supabase
        .from('profiles')
        .update({
          full_name: form.full_name,
          bio: form.bio,
          postal_code: form.postal_code,
          canton: form.canton,
          languages: form.languages
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          job_types: form.job_types
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        })
        .eq('id', userId);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card h-[400px] animate-pulse bg-surface lg:col-span-2" />
        <div className="space-y-4">
          <div className="card h-[160px] animate-pulse bg-surface" />
          <div className="card h-[200px] animate-pulse bg-surface" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <form
        onSubmit={handleSave}
        className="card space-y-4 p-6 lg:col-span-2"
      >
        <h1 className="font-heading text-h2 text-ink">My profile</h1>

        <div>
          <label className="text-small font-medium text-ink">Full name</label>
          <Input
            className="mt-1"
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
          />
        </div>

        <div>
          <label className="text-small font-medium text-ink">Bio</label>
          <textarea
            className="input mt-1 min-h-[100px]"
            placeholder="Tell families about your experience, availability, and personality."
            value={form.bio}
            onChange={(e) => update('bio', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-small font-medium text-ink">
              Postal code
            </label>
            <Input
              className="mt-1"
              value={form.postal_code}
              onChange={(e) => update('postal_code', e.target.value)}
            />
          </div>
          <div>
            <label className="text-small font-medium text-ink">Canton</label>
            <Input
              className="mt-1"
              value={form.canton}
              onChange={(e) => update('canton', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-small font-medium text-ink">
            Languages (comma separated)
          </label>
          <Input
            className="mt-1"
            placeholder="English, French, Tagalog"
            value={form.languages}
            onChange={(e) => update('languages', e.target.value)}
          />
        </div>

        <div>
          <label className="text-small font-medium text-ink">
            Job types (comma separated)
          </label>
          <Input
            className="mt-1"
            placeholder="Nanny, Housekeeping, Childminder"
            value={form.job_types}
            onChange={(e) => update('job_types', e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save profile'}
          </Button>
          {saved && (
            <span className="text-small text-primary">Profile saved ✓</span>
          )}
        </div>
      </form>

      <aside className="space-y-4">
        <ProfileVisibilityWidget userId={userId} />
        <ReviewsWidget />
      </aside>
    </div>
  );
}
