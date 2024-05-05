import React, { useState } from 'react';
import axios from 'axios';
import { RestaurantCardProps} from '../interfaces/RestaurantInterface'
import comments from '../assets/comments-icon.svg'
import location from '../assets/location-pin.svg';
import '../style/RestaurantCard.css'

const RestaurantCard: React.FC<RestaurantCardProps> = ({restaurant}) => {

    return (
        <div className='restaurant-card'>
            <div className='content'>
                <div className='restaurant-info'>
                    <h3>{restaurant.name}</h3>
                    <p><img src={location} alt='location pin'/> {restaurant.adress}</p>
                    <p><img src={comments} alt='comments icon'/> <span>{restaurant.reviews}</span></p>
                </div>
                <div className='header-img' style={{
                    backgroundImage: `url(${restaurant.image_url})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}/>
            </div>
            <div className='category-tags'>
                    {restaurant.category.map((category: string, index: number) => (
                        <p className='category-label' key={index}>{category}</p>
                    ))}
            </div>
        </div>
    );
};

export default RestaurantCard;
