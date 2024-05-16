import React from 'react';
import full from '../assets/full-rating-star.svg';
import half from '../assets/half-rating-star.svg';
import empty from '../assets/empty-rating-star.svg';

const StarRating: React.FC<{rating: number}> = ({rating}) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 10 - fullStars - halfStars;

    return (
        <div className='star-rating'>
            {Array(fullStars).fill(<img src={full} alt="Full Star" />)}
            {halfStars === 1 && <img src={half} alt="Half Star" />}
            {Array(emptyStars).fill(<img src={empty} alt="Empty Star" />)}
        </div>
    );
};


export default StarRating;