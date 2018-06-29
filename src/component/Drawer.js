import React from 'react';
import {connect} from "react-redux";
import {setZip} from "../actions/zip";
import {setRadius} from "../actions/radius";

class Drawer extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div id="dw-s2" className="bmd-layout-drawer bg-faded">
                <header className="text-center">
                    <a className="navbar-brand">Settings</a>
                </header>

                <div className="p-3">
                    <div className="alert alert-info" role="alert">
                        You can choose a zip code to find cinemas where ever you want!
                        <br/>
                        Go give it a try
                    </div>

                    <form>
                        <div className="form-group bmd-form-group">
                            <label htmlFor="zip" className="bmd-label-floating">Enter a zip code</label>
                            <input type="text" className="form-control" id="zip" value={this.props.zip.value} onChange={(event) => {
                                this.props.dispatch(setZip(event.target.value));
                            }}/>
                            {this.props.zip.value.length > 0 && this.props.zip.value.length !== 5 && <small className="text-danger">Zip code must be 5 numbers</small>}
                        </div>

                        <div className="form-group bmd-form-group">
                            <label htmlFor="range" className="bmd-label-floating">Range: {this.props.radius.value}km</label>
                            <input type="range" min={1} max={20} step={1} className="form-control" id="range" value={this.props.radius.value} onChange={(event) => {
                                this.props.dispatch(setRadius(event.target.value));
                                // TODO : reload cinemas
                            }}/>
                        </div>
                    </form>
                </div>

                <div style={{position: "absolute", bottom: 0, width: "100%"}}>
                    <p className="text-center text-muted mb-1">Made with <i className="fa fa-heart text-danger ml-1 mr-1"/> by Julien</p>
                    <p className="text-center text-muted">Powered by <a href="https://allocine.com" target="_blank" rel="noopener noreferrer" className="text-dark">AlloCine</a></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        zip: state.zip,
        radius: state.radius
    }
};

export default connect(mapStateToProps)(Drawer);