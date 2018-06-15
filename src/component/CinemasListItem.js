import React from 'react';
import {Link} from "react-router-dom";

const CinemasListItem = ({code, name, address, city, geoloc}) => {
    return (
        <Link to={`/cinemas/${code}`} className="list-group-item pl-0 pr-0">
            <div className="bmd-list-group-col">
                <p className="list-group-item-heading mb-2">{name}</p>
                <p className="list-group-item-text">
                    {address}, {city}
                </p>
            </div>
        </Link>
    )
};

export default CinemasListItem;