import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './compoents/Guard/Login';
import Register from  './compoents/Guard/Register';
import PubChat from './compoents/Main/PubChat';
import ResetPass from './compoents/Guard/ResetPass';
import configureStore from './stores/index';
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import MyFriend from "./compoents/Main/MyFriend";

import {
    Router, Route, browserHistory, IndexRoute
} from 'react-router';
import PrivateChat from "./compoents/Main/PrivateChat";
import Notifications from "./compoents/Main/Notifications";
import Profile from "./compoents/Main/Profile";


ReactDOM.render((
    <Provider store={configureStore}>
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/" component={PubChat}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/resetPass" component={ResetPass}></Route>
                <Route path="/friend" component={MyFriend}/>
                <Route path="/privateChat" component={PrivateChat}></Route>
                <Route path="/showNotification" component={Notifications}></Route>
                <Route path="/profile" component={Profile}></Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
