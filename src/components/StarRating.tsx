import React from 'react';


const StarRating: React.FC<{rating: number}> = ({rating}) => {
    const stars = Array(10).fill(0).map((_, i) => i < rating ? '★' : '☆');
    return (
        <div className='star-rating'>
            {stars}
        </div>
    );
};

export default StarRating;