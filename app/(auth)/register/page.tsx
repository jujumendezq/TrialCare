'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Role = 'worker' | 'family';

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('worker');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    if (password.length < 8) {
      setState('error');
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role,
          },
          emailRedirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}/dashboard/`
              : undefined,
        },
      });

      if (error) throw error;

      // If the user is immediately signed in (email confirmation disabled),
      // create the profile row now.
      if (data.user && data.session) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          role,
          full_name: fullName.trim(),
          languages: [],
          job_types: [],
          is_visible: true,
        });
        window.location.href = '/dashboard/';
        return;
      }

      // Otherwise show the "check your email" state
      setState('sent');
    } catch (err) {
      setState('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Sign up failed. Please try again.'
      );
    }
  }

  if (state === 'sent') {
    return (
      <div className="container-page flex min-h-screen max-w-md flex-col justify-center py-8">
        <div className="card p-6 text-center">
          <div className="text-3xl">📬</div>
          <h1 className="mt-3 font-heading text-h2 text-ink">
            Almost there!
          </h1>
          <p className="mt-2 text-body text-ink-muted">
            We sent a confirmation link to <strong>{email}</strong>. Click it
            to activate your account.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/login/">Back to log in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page flex min-h-screen max-w-md flex-col justify-center py-8">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 font-heading text-[18px] font-bold text-primary"
      >
        <span aria-hidden className="text-2xl">
          🦋
        </span>
        PinoyCare CH
      </Link>

      <h1 className="font-heading text-h1 text-ink">Kumusta, Kabayan!</h1>
      <p className="mt-2 text-body text-ink-muted">
        Create your free account to get started.
      </p>

      {/* Role picker */}
      <div className="mt-6">
        <p className="text-small font-medium text-ink">I am a…</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole('worker')}
            className={cn(
              'rounded-input border p-3 text-left transition-colors',
              role === 'worker'
                ? 'border-primary bg-primary/5'
                : 'border-surface-border bg-surface hover:bg-surface-soft'
            )}
          >
            <span className="block text-body font-medium text-ink">
              Worker
            </span>
            <span className="mt-0.5 block text-small text-ink-muted">
              I offer babysitting, housekeeping, or care services
            </span>
          </button>
          <button
            type="button"
            onClick={() => setRole('family')}
            className={cn(
              'rounded-input border p-3 text-left transition-colors',
              role === 'family'
                ? 'border-primary bg-primary/5'
                : 'border-surface-border bg-surface hover:bg-surface-soft'
            )}
          >
            <span className="block text-body font-medium text-ink">
              Family
            </span>
            <span className="mt-0.5 block text-small text-ink-muted">
              I want to hire someone to help at home
            </span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="text-small font-medium text-ink"
          >
            Full name
          </label>
          <Input
            id="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Maria Santos"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-small font-medium text-ink">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-small font-medium text-ink"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        {state === 'error' && errorMsg && (
          <p className="text-small text-accent">{errorMsg}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={state === 'loading'}
        >
          {state === 'loading' ? 'Creating account…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-small text-ink-muted">
        Already have an account?{' '}
        <Link href="/login/" className="text-primary hover:underline">
          Log in
        </Link>
      </p>

      <p className="mt-4 text-[12px] text-ink-muted">
        By signing up you agree to comply with Swiss law. PinoyCare CH does not
        verify work permits or identities.
      </p>
    </div>
  );
}
