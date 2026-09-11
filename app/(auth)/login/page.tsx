'use client';
import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'sent' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    try {
      const supabase = createClient();

      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim().toLowerCase(),
          options: {
            emailRedirectTo:
              typeof window !== 'undefined'
                ? `${window.location.origin}/dashboard/`
                : undefined,
          },
        });
        if (error) throw error;
        setState('sent');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) throw error;

      // Success — redirect to dashboard
      window.location.href = '/dashboard/';
    } catch (err) {
      setState('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Login failed. Please check your credentials.'
      );
    }
  }

  if (state === 'sent') {
    return (
      <div className="container-page flex min-h-screen max-w-md flex-col justify-center py-8">
        <div className="card p-6 text-center">
          <div className="text-3xl">📬</div>
          <h1 className="mt-3 font-heading text-h2 text-ink">
            Check your inbox
          </h1>
          <p className="mt-2 text-body text-ink-muted">
            We sent a magic link to <strong>{email}</strong>. Click it to log
            in.
          </p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setState('idle');
              setMode('password');
            }}
          >
            Back
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

      <h1 className="font-heading text-h1 text-ink">Welcome back</h1>
      <p className="mt-2 text-body text-ink-muted">
        Log in to your PinoyCare CH account.
      </p>

      {/* Mode switcher */}
      <div className="mt-6 flex rounded-input border border-surface-border p-1">
        <button
          type="button"
          onClick={() => setMode('password')}
          className={`flex-1 rounded-input px-3 py-2 text-small font-medium transition-colors ${
            mode === 'password'
              ? 'bg-primary text-primary-foreground'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMode('magic')}
          className={`flex-1 rounded-input px-3 py-2 text-small font-medium transition-colors ${
            mode === 'magic'
              ? 'bg-primary text-primary-foreground'
              : 'text-ink-muted hover:text-ink'
          }`}
        >
          Magic link
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

        {mode === 'password' && (
          <div>
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="password"
                className="text-small font-medium text-ink"
              >
                Password
              </label>
              <Link
                href="/forgot-password/"
                className="text-small text-primary hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        {state === 'error' && errorMsg && (
          <p className="text-small text-accent">{errorMsg}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={state === 'loading'}
        >
          {state === 'loading'
            ? mode === 'magic'
              ? 'Sending link…'
              : 'Logging in…'
            : mode === 'magic'
            ? 'Send magic link'
            : 'Log in'}
        </Button>
      </form>

      <p className="mt-6 text-small text-ink-muted">
        No account?{' '}
        <Link href="/register/" className="text-primary hover:underline">
          Sign up free
        </Link>
      </p>

      <p className="mt-2 text-[12px] text-ink-muted">
        PinoyCare CH is 100% free — built by kababayan, for kababayan.
      </p>
    </div>
  );
}
