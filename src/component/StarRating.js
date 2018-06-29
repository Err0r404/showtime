import React from 'react';

const StarRating = ({rating, max, code}) => {
    return (

        <div>
            {[...Array(Math.floor(rating))].map((x, i) =>
                <i key={code+i} className="icon ion-md-star p-1"/>
            )}

            {Math.floor(rating) !== (Math.round(rating * 2) / 2) ? <i className="icon ion-md-star-half p-1"/> : ''}

            {[...Array(max - Math.round(Math.round(rating * 2) / 2))].map((x, i) =>
                <i key={code+i} className="icon ion-md-star-outline p-1"/>
            )}
        </div>
    )
};

export default StarRating;