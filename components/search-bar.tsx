'use client';
import { MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SearchBarProps {
  defaultValue?: string;
  defaultRadius?: '10' | '20' | '50';
  onSubmit?: (data: { location: string; radius: string }) => void;
  buttonLabel?: string;
}

export function SearchBar({
  defaultValue = '',
  defaultRadius = '10',
  onSubmit,
  buttonLabel = 'Search for job offers',
}: SearchBarProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit?.({
          location: String(fd.get('location') ?? ''),
          radius: String(fd.get('radius') ?? '10'),
        });
      }}
      className="card flex flex-col gap-2 p-2 sm:flex-row sm:items-center"
    >
      <label className="flex flex-1 items-center gap-2 rounded-input px-3 py-2 focus-within:ring-2 focus-within:ring-primary/20">
        <MapPin className="h-4 w-4 shrink-0 text-ink-muted" />
        <input
          name="location"
          defaultValue={defaultValue}
          placeholder="Postal code / City"
          className="w-full border-0 bg-transparent text-body outline-none placeholder:text-ink-muted"
          aria-label="Location"
        />
      </label>

      <div className="hidden h-6 w-px bg-surface-border sm:block" aria-hidden />

      <select
        name="radius"
        defaultValue={defaultRadius}
        aria-label="Search radius"
        className="cursor-pointer rounded-input border-0 bg-transparent px-2 py-2 text-body text-ink outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="10">10 km</option>
        <option value="20">20 km</option>
        <option value="50">50 km</option>
      </select>

      <Button type="submit" className="sm:min-w-[200px]">
        <Search className="h-4 w-4" />
        {buttonLabel}
      </Button>
    </form>
  );
}
