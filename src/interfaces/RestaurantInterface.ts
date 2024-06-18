export interface Restaurant{
  id: number | null;
  name: string;
  background_image: string;
  address: string;
  cuisines: string[];
  reviews?: number;
}

export interface RestaurantCardProps {
    restaurant: {
      id: number | null;
      name: string;
      background_image: string;
      address: string;
      cuisines: string[];
      reviews?: number;
    }
}