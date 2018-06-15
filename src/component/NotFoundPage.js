import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <p>Not found's component</p>
            <Link to="/">Home</Link>
        </div>
    )
};

export default NotFoundPage;