import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Main from "../main/Main";
import Reg from "../main/registration/Reg";
import Login from "../main/login/Login";
import Home from "../home/Home";
import {useSelector} from "react-redux";
import Profile from "../home/profile/Profile";
import Moderation from "../home/moderation/Moderation";
import Find from "../home/find/Find";
import Matches from "../home/matches/Matches";


const Router = () => {
    const isAuth: boolean = useSelector((state: any) => state.authLog.authData.isAuth);
    const currentRole = useSelector((state: any) => state.authLog.profileData.profile.role);
    const navigate = useNavigate();

    const backToMain = () => {
        navigate('/');
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<Main/>}>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/reg' element={<Reg/>}/>
                </Route>
                <Route path='*' element={<div> Not found, <a onClick={backToMain}>back to main</a></div>}/>
                {isAuth &&
                    <Route path='/home' element={<Home/>}>
                        <Route path='find' element={<div><Find /></div>}/>
                        <Route path='matches' element={<div><Matches /></div>}/>
                        <Route path='profile' element={<Profile/>}/>
                        {(currentRole !== 'USER') &&
                            <Route path='moderation' element={<div><Moderation /></div>}/>
                        }
                    </Route>
                }
            </Routes>
        </>
    )
}

export default (Router);
