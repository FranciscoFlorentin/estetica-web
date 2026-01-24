export interface Service {
    id: string;
    name: string;
    price: number;
    duration_minutes?: number; // Supabase has this
    duration?: string; // ServiceCard expects this string
    description?: string;
    image?: string; // ServiceCard expects this
}
