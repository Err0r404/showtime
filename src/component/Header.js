import React from 'react';
import {connect} from "react-redux";
import {NavLink, Link} from 'react-router-dom';

class Header extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    {!!this.props.backTo.url && <Link to={this.props.backTo.url}>
                        <button className="btn btn-link text-light my-sm-0 mr-3 mb-0 p-0">
                            <ion-icon name="arrow-back" class="fa-2x"/>
                        </button>
                    </Link>}

                    <NavLink className="navbar-brand mb-0 h1 mr-auto" to="/" exact={true}>
                        <img src="/logo.svg" width="25" height="25" className="d-inline-block align-top mr-1" alt=""/>
                        ShowTime
                    </NavLink>
                </div>
            </nav>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        backTo: state.backTo
    }
};

export default connect(mapStateToProps)(Header);