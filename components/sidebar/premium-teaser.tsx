'use client';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { WaitlistModal } from '@/components/waitlist-modal';

export function PremiumTeaser() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="card p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-warm" aria-hidden />
          <span className="text-small font-medium text-ink-muted">
            Premium — coming soon
          </span>
        </div>

        <h3 className="mt-2 font-heading text-h3 text-ink">
          Premium is coming soon, Kabayan!
        </h3>

        <ul className="mt-3 space-y-1 text-small text-ink-muted">
          <li>• Highlighted profile</li>
          <li>• See who viewed you</li>
          <li>• Unlimited posts</li>
          <li>• Verified Kabayan badge</li>
        </ul>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={() => setOpen(true)}
        >
          Join the waitlist →
        </Button>

        <p className="mt-2 text-[12px] text-ink-muted">
          Pricing announced at launch.
        </p>
      </section>

      <WaitlistModal open={open} onOpenChange={setOpen} />
    </>
  );
}
