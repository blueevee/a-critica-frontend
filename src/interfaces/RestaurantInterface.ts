export interface Restaurant{
  id: number;
  name: string;
  image_url: string;
  adress: string;
  category: string[];
  reviews?: number;
}

export interface RestaurantCardProps {
    restaurant: {
      id: number;
      name: string;
      image_url: string;
      adress: string;
      category: string[];
      reviews?: number;
    }
}