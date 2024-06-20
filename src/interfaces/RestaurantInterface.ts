export interface Restaurant{
  id: number;
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
    restaurant: Restaurant
}