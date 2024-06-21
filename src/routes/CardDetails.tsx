import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom';
import {ReviewProps, Review as ReviewInterface} from '../interfaces/ReviewInterface'
import axios from 'axios';
import location from '../assets/location-pin.svg';
import '../style/CardDetails.css'
import Review from '../components/Review';

const CardDetails: React.FC = () => {
  const { id } = useParams();
  const [restaurantReview, setRestaurantReview] = useState<ReviewProps>();
  const [restaurantCuisines, setRestaurantCuisines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/restaurants/${id}`)
        .then((response) => {
          setRestaurantReview(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          console.error('ERRO: Não consegui trazer as informações desse restaurante 😭😭😭');
        });

        axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/restaurant_cuisines/${id}`)
        .then((response) => {
          setRestaurantCuisines(response.data)
        })
        .catch(() => {
          console.error('ERRO: Não consegui trazer as categorias desse restaurante 😭😭😭');
        });
    };

    fetchRestaurant();
  }, []);

  if (isLoading) {
    return <div style={{
      marginLeft: '25%'
    }} className="loader"></div>;
  }

  if (!restaurantReview?.restaurant.id) {
    return <h2 style={{
      marginLeft: '25%'
    }}>Ocorreu um erro ao buscar esse restaurante...</h2>;
  }

  return (
    <div>
      <div className='restaurant-review-info' style={{
          backgroundImage: `url(${restaurantReview?.restaurant.background_image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
          <div>
            <h1>{restaurantReview?.restaurant.name}</h1>
            <p><img src={location} alt='location pin'/> {restaurantReview?.restaurant.address}</p>
            <div className='category-tags'>
              {restaurantCuisines.map((category: string, index: number) => (
                <p className='category-label' key={index}>{category}</p>
              ))}
            </div>
          </div>

      </div>
      {restaurantReview?.reviews.length < 1 ? (
                <h3 style={{
                  marginLeft: '25%'
                }}>Parece que esse restaurante ainda não possui comentários...</h3>
              ) : (
          <>
            {restaurantReview?.reviews.map((review: ReviewInterface) =>
            <Review review={review}/>
            )}
          </>
          )}
    </div>
    );
};

  export default CardDetails;