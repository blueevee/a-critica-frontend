import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom';
import {ReviewProps, Review as ReviewInterface} from '../interfaces/ReviewInterface'
// import axios from 'axios';
import location from '../assets/location-pin.svg';
import '../style/CardDetails.css'
import Review from '../components/Review';

const CardDetails: React.FC = () => {
  const { id } = useParams();

  //useEffect(() => {
    // axios.get(`/api/restaurant/${id}`)
    //   .then(response => {
        // setRestaurant(response.data);
        //   });
        //   }, [id]);

  const restaurantReviewDetails: ReviewProps = {
    restaurant:{
      adress:"rua jogo aa do numa 123, 333",
      category: ["pizza", "italiana", "francesa", "drinks"],
      id: 1,
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkt9q5n4-l2V9l_v2qteSN9rOF1KMkkW_eR3vlfooYGg&s",
      name: "Pecorino"
    },
    reviews:[{
      visit_date: new Date(12/12/12).toISOString(),
      // visit_date: "2024-05-01T03:00:00.000Z",
      username: "florizha aaa",
      comment: "ballabalb uffuhewf dhbefhf fewuhfuhefw efwuihewfuihewf ewfuihewfiuewf fweuhewfiuewf efwuiewfhiuhewf efwiuhewfuihewfui efwiuewfhiuhewfuifw fiehrfuhre efuirfufeu fruihrfuih ufhercfuhr rufrefuhfr ruherfuihrf rfuhrefuifhr rfhreuihfr rfuduihdfifri rfiuheriuhrigr brgirg birgirg rgiurgirguieg \nfehbehbfrhrbhrhb vueiurvuib\nalbalabala\nbla",
      rating: 2,
      images: [
          "https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg",
          "https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg"
      ],
      bill:[
        {
          "item": "bla ba ba ba 33333333eeeebbbbbbbba",
          "amount": 2,
          "price": 12.04
        },
        {
          "item": "aaaaaaaba",
          "amount": 1,
          "price": 122.04
        },
      ]
    },
      {
        visit_date: new Date().toISOString(),
        // visit_date: "2024-05-04T03:00:00.000Z",
        username: "florzinho capoeiro",
        comment: "bbbbbbbbbbbbbb vvvvvvvvvveerb eererere erreerreerreer",
        rating: 9.5,
        images: [
            "https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg",
            "https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg",
            "https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg",
            "https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqt65-0gvneFQiLYakYNKsS-l6OMDTeLE5wbR3QimTMQ&s"
        ],
        bill:[
          {
            "item": "bla ba",
            "amount": 2,
            "price": 12.04
          },
          {
            "item": "aaaaaaaba",
            "amount": 1,
            "price": 122.04
          },
        ]
      }
    ]
    }


if (!restaurantReviewDetails) {
  return <div>Parece que ainda não tem comentários...</div>;
}
  return (
    <div>
      <div className='restaurant-review-info' style={{
          backgroundImage: `url(${restaurantReviewDetails.restaurant.image_url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
          <div>
            <h1>{restaurantReviewDetails.restaurant.name} {id}</h1>
            <p><img src={location} alt='location pin'/> {restaurantReviewDetails.restaurant.adress}</p>
            <div className='category-tags'>
              {restaurantReviewDetails.restaurant.category.map((category: string, index: number) => (
                <p className='category-label' key={index}>{category}</p>
              ))}
            </div>
          </div>
      </div>
        {restaurantReviewDetails.reviews.map((review: ReviewInterface) =>
						<Review review={review}/>
        )}
    </div>
    );
};

  export default CardDetails;