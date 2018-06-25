import React from 'react';

const Drawer = () => {
    return (
        <div id="dw-s2" className="bmd-layout-drawer bg-faded">
            <header className="text-center">
                <a className="navbar-brand">Settings</a>
            </header>

            {/*<ul className="list-group">*/}
                {/*<li className="list-group-item">Link 1</li>*/}
            {/*</ul>*/}

            <div className="p-3">
                <div className="alert alert-info" role="alert">
                    You can choose a zip code to find cinemas where ever you want!
                    <br/>
                    Go give it a try
                </div>

                <form action="">
                    <div className="form-group bmd-form-group">
                        <label htmlFor="zip" className="bmd-label-floating">Enter a zip code</label>
                        <input type="text" className="form-control" id="zip"/>
                    </div>

                    <div className="form-group bmd-form-group">
                        <label htmlFor="range" className="bmd-label-floating">Range </label>
                        <input type="range" min={1} max={20} step={1} className="form-control" id="range"/>
                    </div>
                </form>
            </div>

            <div style={{position: "absolute", bottom: 0, width: "100%"}}>
                <p className="text-center text-muted mb-1">Made with <i className="fa fa-heart text-danger ml-1 mr-1"/> by Julien</p>
                <p className="text-center text-muted">Powered by <a href="https://allocine.com" target="_blank" className="text-dark">AlloCine</a></p>
            </div>
        </div>
    )
};

export default Drawer;