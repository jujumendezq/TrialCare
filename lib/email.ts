import { Resend } from 'resend';

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendWaitlistConfirmation(to: string) {
  const resend = getResend();
  if (!resend) {
    // Resend is not configured (e.g. GitHub Pages build with no server).
    // Silently skip — the waitlist row in Supabase is still saved.
    return { skipped: true as const };
  }

  return resend.emails.send({
    from: 'PinoyCare CH <hello@pinoycare.ch>',
    to,
    subject: 'You are on the PinoyCare CH Premium waitlist 🎉',
    text:
      'Salamat! You are on the waitlist for PinoyCare CH Premium.\n\n' +
      'We will email you the moment Premium launches. Until then, ' +
      'keep exploring jobs and messages — everything is free.\n\n' +
      '— The PinoyCare CH team',
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1A1A1A;">
        <h1 style="font-size:20px;margin:0 0 12px;">Salamat! 🎉</h1>
        <p style="font-size:15px;line-height:24px;margin:0 0 16px;">
          You are on the waitlist for <strong>PinoyCare CH Premium</strong>.
        </p>
        <p style="font-size:15px;line-height:24px;margin:0 0 16px;">
          We will email you the moment Premium launches. Until then, keep
          exploring jobs and messages — everything is free.
        </p>
        <p style="font-size:15px;line-height:24px;margin:24px 0 0;color:#6B7280;">
          — The PinoyCare CH team
        </p>
      </div>
    `,
  });
}
