import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import {LogUp} from "./components/c1-Logup/Logup";
import {Profile} from "./components/c3-Profile/Profile";
import {PasswordRecovery} from "./components/c5-PasswordRecovery/PasswordRecovery";
import {EnterANewPassword} from "./components/с4-EnterANewPassword/EnterANewPassword";
import {Test} from "./components/с7-Test/Test";
import {ErrorSnackbar} from "./components/с6-Error/ErrorPage";
import {LogIn} from "./components/c2-Login/Login";
import {Header} from "./components/c9-Header/Header";

function App() {

    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/log_in" render={()=><LogIn/>}/>
                <Route path="/log_up" render={() => <LogUp/>}/>
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/password_recovery" render={() => <PasswordRecovery/>}/>
                <Route path="/enter_a_new_password" render={() => <EnterANewPassword/>}/>
                <Route path="/test" render={() => <Test/>}/>
                <Route path="/error404" render={() => <ErrorSnackbar/>}/>
            </Switch>
        </div>
    );
}

export default App;
