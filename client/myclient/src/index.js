import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from './Redux/reducers/allReducers';
import { login } from './Redux/actions/login';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

if (localStorage.userToken) {
    console.log('token exists')
    const user={token:localStorage.userToken};
    store.dispatch(login(user.token));
    // Get user info by decode token
    // localStorage.removeItem('userToken');
}

export default store
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
