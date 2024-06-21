import React, { useState } from 'react';
import axios from 'axios';
import { Restaurant} from '../interfaces/RestaurantInterface'
import { Review, ReviewProps } from '../interfaces/ReviewInterface';
import RestaurantForm from '../components/RestaurantForm'
import { Toast } from '../components/Toast';
import ReviewForm from '../components/ReviewForm';
import '../style/AddReviewForm.css'
import { useNavigate } from 'react-router-dom';

const AddReview: React.FC = () => {

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [IncompleteDataToastVisible, setIncompleteDataToastVisible] = useState(false);
  const [PostErrrorToastVisible, setPostErrrorToastVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/logout`);
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('ERRO: Não consegui encerrar sua sessão 😭😭');
      }
    } catch (error) {
      console.error('ERRO: ocorreu um erro ao encerrar sua sessão 😭😭', error);
    }
  };

  const handleRestaurantSubmit = (restaurant: Restaurant) => {

    setRestaurant(restaurant);
  };

  const handleReviewSubmit = (review: Review) => {
    setReviews([...reviews, review]);
  };

  const handleSubmit = () => {
    if (restaurant && reviews.length > 0) {
      setIsLoading(true);
      const review: ReviewProps = {
        restaurant: restaurant,
        reviews: reviews,
      }
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/new_review`, review)
        .then(() => {
          setToastVisible(true);
        })
        .catch(() => {
          console.error('ERRO: Não consegui enviar a avaliação 😭😭😭');
          setPostErrrorToastVisible(true);
        });
        setIsLoading(false);
    } else{
      setIncompleteDataToastVisible(true);
    }

  };

  return (
      <div>
        <button onClick={handleLogout} className='logout-button'>Encerrar sessão</button>
        <Toast
                message="Avaliação adicionada com sucesso!"
                isVisible={toastVisible}
                hideToast={() => setToastVisible(false)}
                className='toast--green'
            />
        <Toast
                message="Ocorreu um erro ao salvar a crítica, tente novamente mais tarde."
                isVisible={PostErrrorToastVisible}
                hideToast={() => setPostErrrorToastVisible(false)}
                className='toast--red'
            />
        <Toast
                message="Você confirmar um restaurante e preencher pelo menos 1 comentário."
                isVisible={IncompleteDataToastVisible}
                hideToast={() => setIncompleteDataToastVisible(false)}
                className='toast--yellow'
            />
            <RestaurantForm onSubmit={handleRestaurantSubmit}/>
            {isLoading ? (
                <div className="loader"></div>
              ) :(
                <ReviewForm onSubmit={handleReviewSubmit}/>
              )}
                <button onClick={handleSubmit} className='submit-button'>
                  Finalizar avaliação
                </button>
        </div>
    );
  };

  export default AddReview;