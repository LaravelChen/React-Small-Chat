import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './compoents/Guard/Login';
import Register from  './compoents/Guard/Register';
import PubChat from './compoents/Main/PubChat';
import ResetPass from './compoents/Guard/ResetPass';
import configureStore from './stores/index';
import {Provider} from 'react-redux'

import {
    Router, Route, browserHistory, IndexRoute
} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <Provider store={configureStore}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={PubChat}></IndexRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/resetPass" component={ResetPass}></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
