import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "../components/Login/Login";
import {LogUp} from "../components/Logup/Logup";
import {Profile} from "../components/Profile/Profile";
import {Forgot} from "../components/Forgot/Forgot";
import {SetPass} from "../components/SetPass/SetPass";
import {Header} from "../components/Header/Header";
import PacksList from "../components/Pack/Pack";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfileTC} from "../reducers/r2-LoginReducer";
import Cards from "../components/Cards/Cards";
import {AppRootStateType} from "./store";
import {ResponseType} from "../api/LoginAPI";

function App() {
    const dispatch = useDispatch()
    const login = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)

    useEffect(()=>{
        if (!login){
            dispatch(setUserProfileTC())
        }
    },[dispatch])


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
                {/*<Route path="/*" render={() => <LogIn/>}/>*/}
            </Switch>
        </div>
    );
}

export default App;
