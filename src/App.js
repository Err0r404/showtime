import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './component/Header';
import Drawer from "./component/Drawer";
import CinemasList from "./component/CinemasList";
import MovieList from "./component/MovieList";
import NotFoundPage from "./component/NotFoundPage";
import MovieDashboard from "./component/MovieDashboard";
import Footer from "./component/Footer";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <div className="bmd-layout-container bmd-drawer-f-r bmd-drawer-overlay">
                    <Header/>

                    <Drawer/>

                    <Switch>
                        <Route path="/" component={CinemasList} exact={true} />
                        <Route path="/cinemas" component={CinemasList} exact={true} />
                        <Route path="/cinemas/:code" component={MovieList} />
                        <Route path="/movies/:cinemaCode/:movieCode" component={MovieDashboard} />
                        <Route component={NotFoundPage} />
                    </Switch>

                </div>

                <Footer/>
            </div>
        </BrowserRouter>
    )
};

export default AppRouter;