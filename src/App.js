import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './component/Header';
import Drawer from "./component/Drawer";
import CinemasList from "./component/CinemasList";
import MovieList from "./component/MovieList";
import NotFoundPage from "./component/NotFoundPage";
import MovieDashboard from "./component/MovieDashboard";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div style={{position: "relative", height: "100%", minHeight: "100%"}}>
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
            </div>
        </BrowserRouter>
    )
};

export default AppRouter;