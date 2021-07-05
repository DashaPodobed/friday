import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "../components/c2-Login/Login";
import {LogUp} from "../components/c1-Logup/Logup";
import {Profile} from "../components/c3-Profile/Profile";
import {Forgot} from "../components/c5-Forgot/Forgot";
import {SetPass} from "../components/с4-SetPass/SetPass";
import {Header} from "../components/c9-Header/Header";
import {Pagination} from "../features/pagination/Pagination";

function App() {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/log_in" render={()=><LogIn/>}/>
                <Route path="/log_up" render={() => <LogUp/>}/>
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/forgot" render={() => <Forgot/>}/>
                <Route path="/set_new_password/:token" render={() => <SetPass/>}/>
                <Route path="/pagination" render={() => <Pagination/>}/>
            </Switch>
        </div>
    );
}

export default App;
