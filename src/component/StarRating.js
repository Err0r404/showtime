import React from 'react';

const StarRating = ({rating, max, code}) => {
    return (
        <div>
            {[...Array(Math.floor(rating))].map((x, i) =>
                <ion-icon key={code+i} name="star"></ion-icon>
            )}

            {Math.floor(rating) !== (Math.round(rating * 2) / 2) ? <ion-icon name="star-half"></ion-icon> : ''}

            {[...Array(max - Math.round(Math.round(rating * 2) / 2))].map((x, i) =>
                <ion-icon key={code+i} name="star-outline"></ion-icon>
            )}
        </div>
    )
};

export default StarRating;