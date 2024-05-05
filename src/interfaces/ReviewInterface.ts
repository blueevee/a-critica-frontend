import { Restaurant} from './RestaurantInterface'

export interface ItemBill{
    item: string;
    amount: number;
    price: number;
}

export interface Review{
    visit_date: string;
    username: string;
    comment: string;
    rating: number;
    images?: string[];
    bill?: ItemBill[]
}

export interface ReviewInterface {
    review: Review
}

export interface ReviewProps {
    restaurant: Restaurant,
    reviews: Review[]
  }
