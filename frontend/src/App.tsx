import React, {useEffect} from 'react';
import './App.css';
import Router from "./components/ui/Router";
import {BrowserRouter} from "react-router-dom";
import {authService} from "./api/auth/AuthService";
import {defaultService} from "./api/default/DefautlService";
import {serverAPI} from "./api/ServerAPI";
import {useSelector} from "react-redux";

function App() {
    const isAuth: boolean = useSelector((state: any) => state.authLog.authData.isAuth);

    authService.init();
    if (isAuth) {
        defaultService.init();
    }
    serverAPI.start();

    return (
        <BrowserRouter>
            <div className="App">
                <Router/>
            </div>
        </BrowserRouter>
    );
}

export default App;
