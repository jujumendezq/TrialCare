import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ReviewsWidgetProps {
  rating?: number;
  count?: number;
}

export function ReviewsWidget({
  rating = 5,
  count = 1,
}: ReviewsWidgetProps) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <section className="card p-4">
      <h3 className="font-heading text-h3 text-ink">Reviews</h3>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex" aria-label={`${safeRating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              aria-hidden
              className={
                i < safeRating
                  ? 'h-4 w-4 fill-warm text-warm'
                  : 'h-4 w-4 text-surface-border'
              }
            />
          ))}
        </div>
        <span className="text-small text-ink-muted">
          {count} review{count === 1 ? '' : 's'}
        </span>
      </div>

      <p className="mt-3 text-small text-ink-muted">
        Positive reviews will increase your future job prospects considerably.
      </p>

      <Button variant="outline" size="sm" className="mt-3 w-full">
        Request review
      </Button>
    </section>
  );
}
