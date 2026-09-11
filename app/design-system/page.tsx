import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ListingCard } from '@/components/listing-card';

export default function DesignSystemPage() {
  return (
    <div className="container-page space-y-12 py-8">
      <header>
        <h1 className="font-heading text-h1 text-ink">
          PinoyCare CH design system
        </h1>
        <p className="mt-2 text-body text-ink-muted">
          Every token, component, and variant — the living style guide.
        </p>
      </header>

      {/* Colors */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Colors</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="primary" className="bg-primary" hex="#0F7B8A" />
          <Swatch name="primary-hover" className="bg-primary-hover" hex="#0B6570" />
          <Swatch name="accent" className="bg-accent" hex="#CE1126" />
          <Swatch name="warm" className="bg-warm" hex="#FCD116" />
          <Swatch name="swiss" className="bg-swiss" hex="#FF0000" />
          <Swatch name="ink" className="bg-ink" hex="#1A1A1A" />
          <Swatch name="ink-muted" className="bg-ink-muted" hex="#6B7280" />
          <Swatch name="surface-border" className="bg-surface-border" hex="#E5E7EB" />
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Typography</h2>
        <div className="card mt-4 space-y-3 p-6">
          <p className="font-heading text-h1">h1 · Poppins 700 · 32/40</p>
          <p className="font-heading text-h2">h2 · Poppins 600 · 24/32</p>
          <p className="font-heading text-h3">h3 · Poppins 600 · 18/28</p>
          <p className="text-body">body · Inter 400 · 15/24</p>
          <p className="text-small">small · Inter 400 · 13/20</p>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Buttons</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="accent">Accent</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Inputs & Switch</h2>
        <div className="card mt-4 grid max-w-md gap-3 p-6">
          <Input placeholder="Text input" />
          <Input placeholder="Disabled input" disabled />
          <div className="flex items-center gap-3">
            <Switch defaultChecked /> <span className="text-body">Enabled</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch /> <span className="text-body">Disabled state</span>
          </div>
        </div>
      </section>

      {/* Chips */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Chips</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="chip">Nanny</span>
          <span className="chip">Childminder</span>
          <span className="chip">Regular</span>
          <span className="chip">Housekeeping</span>
          <span className="chip">Part-time</span>
          <span className="chip">Live-out</span>
        </div>
      </section>

      {/* Listing card */}
      <section>
        <h2 className="font-heading text-h2 text-ink">Listing card</h2>
        <div className="mt-4 max-w-2xl">
          <ListingCard
            id="demo"
            posterName="Candle"
            postalCode="1227 Les Acacias"
            title="Recherche de maman de jour pour notre fille de 2 ans"
            description="Nous cherchons une personne de confiance pour garder notre fille du lundi au vendredi."
            tags={['Nanny', 'Childminder', 'Regular']}
            thumbnailUrl={null}
          />
        </div>
      </section>
    </div>
  );
}

function Swatch({
  name,
  className,
  hex,
}: {
  name: string;
  className: string;
  hex: string;
}) {
  return (
    <div>
      <div className={`h-16 w-full rounded-card ${className}`} />
      <p className="mt-2 text-small font-medium text-ink">{name}</p>
      <p className="text-[12px] text-ink-muted">{hex}</p>
    </div>
  );
}
