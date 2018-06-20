import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './component/Header';
import CinemasList from "./component/CinemasList";
import MovieList from "./component/MovieList";
import NotFoundPage from "./component/NotFoundPage";
import MovieDashboard from "./component/MovieDashboard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Header/>

                <div className="container pt-3">
                    <Switch>
                        <Route path="/" component={CinemasList} exact={true} />
                        <Route path="/cinemas" component={CinemasList} exact={true} />
                        <Route path="/cinemas/:code" component={MovieList} />
                        <Route path="/movies/:cinemaCode/:movieCode" component={MovieDashboard} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default AppRouter;