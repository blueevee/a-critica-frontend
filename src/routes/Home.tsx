import React, { useState, useEffect }  from 'react'
import axios from "axios";
import RestaurantCard from '../components/RestaurantCard'
import SearchBar from '../components/SearchBar'
import { Restaurant} from '../interfaces/RestaurantInterface'
import { Link } from 'react-router-dom';
import { Toast } from '../components/Toast';
import '../style/Home.css'


const RestaurantsList: React.FC = () => {
  	const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [postErrrorToastVisible, setPostErrrorToastVisible] = useState(false);

    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/restaurants`)
        .then((response) => {
          setRestaurants(response.data)
          setIsLoading(false);
        })
        .catch(() => {
          console.error('ERRO: Não consegui trazer todos os restaurantes 😭😭😭');
          setPostErrrorToastVisible(true);
        });
    }, []);

    return (
        <div className="page-content">
          <h1>Restaurantes avaliados</h1>
          <Toast
                message="Ocorreu um erro ao buscar os restaurantes."
                isVisible={postErrrorToastVisible}
                hideToast={() => setPostErrrorToastVisible(false)}
                className='toast--red'
            />
          <SearchBar onSearch={setSearchTerm} />
            <div  className="restaurants-list">
            {isLoading ? (
                <div className="loader"></div>
              ) : (
                restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())).map((restaurant: Restaurant) => (
                  <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                    <RestaurantCard
                       restaurant={restaurant}/>
                  </Link>
                ))
              )}
            </div >
        </div>
    )
  };

  export default RestaurantsList;