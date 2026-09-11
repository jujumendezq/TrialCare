export const locales = ['en', 'tl', 'de', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  tl: 'Tagalog',
  de: 'Deutsch',
  fr: 'Français',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
