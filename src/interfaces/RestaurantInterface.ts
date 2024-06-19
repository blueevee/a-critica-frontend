export interface Restaurant{
  id: number | null;
  name: string;
  background_image: string;
  address: string;
  cuisines?: string[];
  reviews?: number;
}

export interface Cuisine{
  id: number;
  cuisine_name: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantCardProps {
    restaurant: {
      id: number | null;
      name: string;
      background_image: string;
      address: string;
      // cuisines: string[];
      reviews?: number;
    }
}