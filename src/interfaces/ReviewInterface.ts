import { Restaurant} from './RestaurantInterface'

export interface ItemBill{
    item_description: string;
    amount: number;
    price: number;
}

export interface Review{
    visit_date: string;
    pseudonym: string;
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
