import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and ' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (or repo secrets).'
    );
  }

  return createBrowserClient(url, key);
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'worker' | 'family';
          full_name: string;
          photo_url: string | null;
          bio: string | null;
          canton: string | null;
          postal_code: string | null;
          languages: string[];
          job_types: string[];
          availability: string | null;
          permit_type: string | null;
          is_visible: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: 'worker' | 'family';
          full_name?: string;
          photo_url?: string | null;
          bio?: string | null;
          canton?: string | null;
          postal_code?: string | null;
          languages?: string[];
          job_types?: string[];
          availability?: string | null;
          permit_type?: string | null;
          is_visible?: boolean;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };

      jobs: {
        Row: {
          id: string;
          poster_id: string;
          category: string;
          title: string;
          description: string;
          postal_code: string | null;
          canton: string | null;
          schedule: string | null;
          languages_required: string[];
          photo_urls: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          poster_id: string;
          category: string;
          title: string;
          description: string;
          postal_code?: string | null;
          canton?: string | null;
          schedule?: string | null;
          languages_required?: string[];
          photo_urls?: string[];
          is_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['jobs']['Insert']>;
      };

      applications: {
        Row: {
          id: string;
          job_id: string;
          applicant_id: string;
          message: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          applicant_id: string;
          message?: string | null;
          status?: string;
        };
        Update: Partial<Database['public']['Tables']['applications']['Insert']>;
      };

      conversations: {
        Row: {
          id: string;
          participant_a: string;
          participant_b: string;
          job_id: string | null;
          last_message_at: string;
        };
        Insert: {
          id?: string;
          participant_a: string;
          participant_b: string;
          job_id?: string | null;
          last_message_at?: string;
        };
        Update: Partial<Database['public']['Tables']['conversations']['Insert']>;
      };

      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          read_at?: string | null;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };

      favourites: {
        Row: {
          user_id: string;
          job_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          job_id: string;
        };
        Update: Partial<Database['public']['Tables']['favourites']['Insert']>;
      };

      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          body: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          reviewer_id: string;
          reviewee_id: string;
          rating: number;
          body?: string | null;
        };
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };

      profile_views: {
        Row: {
          id: string;
          viewer_id: string;
          viewed_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          viewer_id: string;
          viewed_id: string;
        };
        Update: Partial<Database['public']['Tables']['profile_views']['Insert']>;
      };

      premium_waitlist: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
        };
        Update: Partial<Database['public']['Tables']['premium_waitlist']['Insert']>;
      };

      reports: {
        Row: {
          id: string;
          reporter_id: string | null;
          target_type: string;
          target_id: string;
          reason: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          reporter_id?: string | null;
          target_type: string;
          target_id: string;
          reason: string;
          status?: string;
        };
        Update: Partial<Database['public']['Tables']['reports']['Insert']>;
      };
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
