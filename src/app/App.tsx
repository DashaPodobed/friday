import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "../components/c2-Login/Login";
import {LogUp} from "../components/c1-Logup/Logup";
import {Profile} from "../components/c3-Profile/Profile";
import {Forgot} from "../components/c5-Forgot/Forgot";
import {SetPass} from "../components/с4-SetPass/SetPass";
import {Header} from "../components/c9-Header/Header";
import PacksList from "../components/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ResponseType} from "../api/LoginAPI";
import {setUserProfileTC} from "../reducers/r2-LoginReducer";
import Cards from "../components/Cards/Cards";

function App() {
    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)

    console.log(profile)
    console.log(isInitialized)

    useEffect(()=>{
        dispatch(setUserProfileTC())
    },[])


    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/log_in" render={() => <LogIn/>}/>
                <Route path="/log_up" render={() => <LogUp/>}/>
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/forgot" render={() => <Forgot/>}/>
                <Route path="/pack" render={() => <PacksList/>}/>
                <Route path="/cards" render={() => <Cards/>}/>
                <Route path="/set_new_password/:token" render={() => <SetPass/>}/>
                <Route path="/*" render={() => <LogIn/>}/>
            </Switch>
        </div>
    );
}

export default App;
