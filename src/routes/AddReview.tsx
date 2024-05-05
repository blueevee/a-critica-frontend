import React, { useState } from 'react';
import { Restaurant} from '../interfaces/RestaurantInterface'
import { Review, ReviewProps } from '../interfaces/ReviewInterface';
import RestaurantForm from '../components/RestaurantForm'
import { Toast } from '../components/Toast';
import ReviewForm from '../components/ReviewForm';
import '../style/AddReviewForm.css'


const AddReview: React.FC = () => {

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [IncompleteDataToastVisible, setIncompleteDataToastVisible] = useState(false);

  const handleRestaurantSubmit = (restaurant: Restaurant) => {

    // const review: ReviewProps = {
    //   restaurant: restaurant,
    // }
    setRestaurant(restaurant);
    console.log("ADD RESTAURANNTTT")
    // Aqui você pode concatenar os dados deste formulário com os dados de outro formulário
    // E então enviar todos os dados para a API
  };

  const handleReviewSubmit = (review: Review) => {
    setReviews([...reviews, review]);
    console.log("ADD REVIEWW")
  };

  const handleSubmit = () => {
    if (restaurant && reviews.length > 0) {
      const review: ReviewProps = {
        restaurant: restaurant,
        reviews: reviews,
      }
      console.log("REVIEW PARA ENVIAR AO BACK", review)
      setToastVisible(true);
    } else{
      setIncompleteDataToastVisible(true);
    }

  };

  return (
      <div>
        <Toast
                message="Avaliação adicionada com sucesso!"
                isVisible={toastVisible}
                hideToast={() => setToastVisible(false)}
                className='toast--green'
            />
        <Toast
                message="Você deve preencher no mínimo 1 comentário por restaurante confirmado."
                isVisible={IncompleteDataToastVisible}
                hideToast={() => setIncompleteDataToastVisible(false)}
                className='toast--red'
            />
        <RestaurantForm onSubmit={handleRestaurantSubmit}/>
        <ReviewForm onSubmit={handleReviewSubmit}/>
        <button onClick={handleSubmit} className='submit-button'>
          Finalizar avaliação
        </button>
        </div>
    );
  };

  export default AddReview;