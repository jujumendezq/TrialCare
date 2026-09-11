'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase';

export function WaitlistModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      setState('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setState('loading');
    setErrorMsg('');

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('premium_waitlist')
        .insert({ email: trimmed });

      // 23505 = unique_violation → already on the list, treat as success
      if (error && error.code !== '23505') {
        throw new Error(error.message);
      }

      setState('done');
    } catch (err) {
      setState('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      // reset on close so reopening shows a fresh form
      setTimeout(() => {
        setState('idle');
        setEmail('');
        setErrorMsg('');
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {state === 'done' ? (
          <div className="py-4 text-center">
            <div className="text-3xl">🎉</div>
            <DialogTitle className="mt-3">
              Salamat! You&apos;re on the list.
            </DialogTitle>
            <DialogDescription>
              We&apos;ll email you when Premium launches. Pricing announced at
              launch.
            </DialogDescription>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <DialogTitle>Join the Premium waitlist</DialogTitle>
            <DialogDescription>
              Be the first to know when Premium launches. No spam — promise.
            </DialogDescription>
            <div className="mt-4">
              <Input
                type="email"
                required
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === 'loading'}
                aria-label="Email address"
              />
            </div>
            {state === 'error' && errorMsg && (
              <p className="mt-2 text-small text-accent">{errorMsg}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                disabled={state === 'loading'}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={state === 'loading'}>
                {state === 'loading' ? 'Saving…' : 'Join waitlist'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
