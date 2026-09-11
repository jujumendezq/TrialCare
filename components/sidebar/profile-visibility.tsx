'use client';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { createClient } from '@/lib/supabase';

export function ProfileVisibilityWidget({
  defaultOn = true,
  userId,
}: {
  defaultOn?: boolean;
  userId?: string;
}) {
  const [on, setOn] = useState(defaultOn);
  const [saving, setSaving] = useState(false);

  // When a userId is provided, load the current value from Supabase
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('profiles')
          .select('is_visible')
          .eq('id', userId)
          .maybeSingle();
        if (!cancelled && data) setOn(data.is_visible);
      } catch {
        // env not configured or table not set up yet — keep default
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function handleToggle(next: boolean) {
    setOn(next);
    if (!userId) return;

    setSaving(true);
    try {
      const supabase = createClient();
      await supabase
        .from('profiles')
        .update({ is_visible: next })
        .eq('id', userId);
    } catch {
      // revert on failure
      setOn(!next);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="card p-4">
      <h3 className="font-heading text-h3 text-ink">Profile visibility</h3>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-small text-ink-muted">
          {on ? 'Visible to others' : 'Hidden'}
        </span>
        <Switch
          checked={on}
          onCheckedChange={handleToggle}
          disabled={saving}
          aria-label="Toggle profile visibility"
        />
      </div>
      <p className="mt-3 text-small text-ink-muted">
        Others can find and view your profile. Disable your profile visibility
        if you no longer want to be shown in the search results.
      </p>
    </section>
  );
}
