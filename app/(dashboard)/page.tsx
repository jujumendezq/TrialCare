import { MessageCircle } from 'lucide-react';
import { SearchBar } from '@/components/search-bar';
import { ListingCard } from '@/components/listing-card';
import { ProfileVisibilityWidget } from '@/components/sidebar/profile-visibility';
import { ReviewsWidget } from '@/components/sidebar/reviews';
import { PremiumTeaser } from '@/components/sidebar/premium-teaser';

const SUGGESTED = [
  {
    id: '1',
    posterName: 'Candle',
    postalCode: '1227 Les Acacias',
    title: 'Recherche de maman de jour pour notre fille de 2 ans',
    description:
      'Nous cherchons une personne de confiance pour garder notre fille du lundi au vendredi, de 8h à 17h. Français apprécié.',
    tags: ['Nanny', 'Childminder', 'Regular'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=240&fit=crop',
  },
  {
    id: '2',
    posterName: 'Justine',
    postalCode: '1244 Choulex',
    title: 'Nounou recherchée pour deux enfants',
    description:
      'Famille à Choulex cherche nounou à temps plein, permis de travail requis. Anglais ou français.',
    tags: ['Nanny', 'Regular'],
    thumbnailUrl: null,
  },
  {
    id: '3',
    posterName: 'Julie',
    postalCode: '1206 Genève',
    title: 'Recherche nounou — Temps partiel',
    description:
      'Besoin d’aide les mercredis et vendredis après-midi pour notre fils de 4 ans.',
    tags: ['Nanny', 'Part-time'],
    thumbnailUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=240&fit=crop',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Greeting + search */}
      <div className="space-y-6">
        <h1 className="text-center font-heading text-h1 text-ink">
          Hello, Mary! 👋
        </h1>
        <SearchBar defaultValue="1226 Thônex" defaultRadius="10" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="font-heading text-h2 text-ink">Messages</h2>
            <div className="card mt-3 flex items-center gap-3 p-4">
              <MessageCircle className="h-5 w-5 text-primary" />
              <p className="text-body text-ink">
                <span className="font-medium">1</span> unanswered message
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-h2 text-ink">Suggested jobs</h2>
            <div className="mt-3 space-y-4">
              {SUGGESTED.map((job) => (
                <ListingCard key={job.id} {...job} />
              ))}
            </div>
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProfileVisibilityWidget />
          <ReviewsWidget />
          <PremiumTeaser />
        </aside>
      </div>
    </div>
  );
}
