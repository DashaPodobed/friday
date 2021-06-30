import React from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "./components/c2-Login/Login";
import {LogUp} from "./components/c1-Logup/Logup";
import {Profile} from "./components/c3-Profile/Profile";
import {Test} from "./components/с7-Test/Test";
import {Forgot} from "./components/c5-Forgot/Forgot";
import {SetPass} from "./components/с4-SetPass/SetPass";
import {Header} from "./components/c9-Header/Header";

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
                <Route path="/test" render={() => <Test/>}/>
                {/*<Route path="/error404" render={() => <ErrorPage/>}/>*/}
            </Switch>
        </div>
    );
}

export default App;
