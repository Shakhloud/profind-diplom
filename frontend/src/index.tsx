import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider, useSelector} from "react-redux";
import {store} from "./redux/store";
import {authService} from "./api/auth/AuthService";
import {serverAPI} from "./api/ServerAPI";
import {defaultService} from "./api/default/DefautlService";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();
