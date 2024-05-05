import React, { useState, useEffect }  from 'react'
import axios from "axios";
import RestaurantCard from '../components/RestaurantCard'
import SearchBar from '../components/SearchBar'
import { Restaurant} from '../interfaces/RestaurantInterface'
import { Link } from 'react-router-dom';
import '../style/Home.css'


const RestaurantsList: React.FC = () => {
  	const [searchTerm, setSearchTerm] = useState('');
    const [restaurants, setRestaurants] = useState([])

    const mockRestaurants = [
      {
        id: 1,
        name: "Piqueta de cartoe ke",
        adress: "rua boulebardc aaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa",
        image_url: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
        reviews: 2,
        category: ['Italiana', 'Japonesa', 'Drinks', 'Pizza']
      },
      {
        id: 2,
        name: "Parada",
        image_url: "https://11freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
        adress: "rua bouleaaaaaaaaaaaa 12 sssbardc",
        reviews: 2,
        category: ['Hamburguér', 'Drinks', 'Pizza']
      },
      {
        id: 3,
        name: "Paredeiqueta",
        adress: "rua boulebardceeee eeeee",
        reviews: 2,
        image_url: "",
        category: ['Bolos', 'Drinks', 'Pizza']
      },
      {
        id: 4,
        name: "Piqueta sj djj eyy",
        adress: "rua boulebardc",
        image_url: "",
        reviews: 2,
        category: ['Drinks', 'Pizza']
      },
      {
        id: 5,
        name: "pacare",
        adress: "rua boulebardc",
        image_url: "https://img.restaurantguru.com/w550/h367/ra36-pizza-Sweet-pizza-val-2023-01.jpg",
        reviews: 2,
        category: ['Doces', 'Pizza']
      },
      {
        id: 6,
        name: "Pecorino",
        reviews: 2,
        adress: "rua boulebardc",
        image_url: "",
        category: ['Pizza']
      },
      {
        id: 7,
        name: "Pecorino",
        reviews: 212,
        adress: "rua boulebardc",
        image_url: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
        category: ['Pizza']
      }
    ]

    // useEffect(() => {
    //   axios
    //     .get('http://localhost:8000/gift')
    //     .then((response) => {
    //       setRestaurants(mockRestaurants.map((restaurant: Restaurant) => ({
    //       // setRestaurants(response.data.map((gift: Gift) => ({
    //         id: restaurant.id,
    //         adress: restaurant.adress,
    //         name: restaurant.name,
    //       })))
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

    return (
        <div className="page-content">
          <h1>Restaurantes avaliados</h1>
          <SearchBar onSearch={setSearchTerm} />
            <div  className="restaurants-list">
				{mockRestaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())).map((restaurant: Restaurant) => (
	  				<Link to={`/restaurant/${restaurant.id}`}>
						<RestaurantCard style={{
              textDecoration: 'none',
              color: 'inherit'}}
               key={restaurant.id} restaurant={restaurant}/>
					</Link>
				))}
            </div >
        </div>
    )
  };

  export default RestaurantsList;