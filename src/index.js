import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';

import App from './App';
import configureStore from './store/configureStore';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
