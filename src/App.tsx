import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "./components/c2-Login/Login";
import {LogUp} from "./components/c1-Logup/Logup";
import {Profile} from "./components/c3-Profile/Profile";
import {PasswordRecovery} from "./components/c5-PasswordRecovery/PasswordRecovery";
import {EnterANewPassword} from "./components/с4-EnterANewPassword/EnterANewPassword";
import {Test} from "./components/с7-Test/Test";
import {ErrorPage} from "./components/с6-error/ErrorPage";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/log_in" component={()=><LogIn/>}/>
                <Route path="/log_up" component={() => <LogUp/>}/>
                <Route path="/profile" component={() => <Profile/>}/>
                <Route path="/password_recovery" component={() => <PasswordRecovery/>}/>
                <Route path="/enter_a_new_password" component={() => <EnterANewPassword/>}/>
                <Route path="/test" component={() => <Test/>}/>
                <Route path="/error404" component={() => <ErrorPage/>}/>
            </Switch>
        </div>
    );
}

export default App;
