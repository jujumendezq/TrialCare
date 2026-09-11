'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function MessagesPage() {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);

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
          .from('conversations')
          .select('*')
          .or(`participant_a.eq.${user.id},participant_b.eq.${user.id}`)
          .order('last_message_at', { ascending: false });

        if (!cancelled) setConversations(data ?? []);
      } catch {
        // env not configured yet
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Conversation list */}
      <aside className="card p-4 lg:col-span-1">
        <h2 className="font-heading text-h3 text-ink">Conversations</h2>
        {loading ? (
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-soft" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface-soft" />
          </div>
        ) : conversations.length === 0 ? (
          <p className="mt-3 text-small text-ink-muted">
            Wala pang messages dito — start a conversation!
          </p>
        ) : (
          <ul className="mt-3 space-y-1">
            {conversations.map((c) => (
              <li
                key={c.id}
                className="cursor-pointer rounded-input px-3 py-2 text-small text-ink hover:bg-surface-soft"
              >
                Conversation {c.id.slice(0, 8)}
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Message thread */}
      <section className="card flex min-h-[400px] items-center justify-center p-6 lg:col-span-2">
        <p className="text-center text-body text-ink-muted">
          {conversations.length === 0
            ? 'Select a conversation or start a new one.'
            : 'Select a conversation to view messages.'}
        </p>
      </section>
    </div>
  );
}
