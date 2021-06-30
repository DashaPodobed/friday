import * as React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {LogIn} from "./components/c2-Login/Login";
import {LogUp} from "./components/c1-Logup/Logup";
import {Profile} from "./components/c3-Profile/Profile";
import {PasswordRecovery} from "./components/c5-PasswordRecovery/PasswordRecovery";
import {EnterANewPassword} from "./components/с4-EnterANewPassword/EnterANewPassword";
import {Test} from "./components/с7-Test/Test";
import {ErrorPage} from "./components/с6-error/ErrorPage";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";

function App() {
    const {isLogUp} = useSelector((state: AppRootStateType) => state.logup)
    if (isLogUp) {
        return <Redirect from={'*'} to={'/log_in'}/>
    }
    return (
        <div className="App">
            <Switch>
                <Route exact path={'/log_up'} render={() => <LogUp/>}/>
                <Route path="/log_in" render={() => <LogIn/>}/>
                {/*<Route path="/log_up" component={() => <LogUp/>}/>*/}
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/password_recovery" render={() => <PasswordRecovery/>}/>
                <Route path="/enter_a_new_password" render={() => <EnterANewPassword/>}/>
                <Route path="/test" render={() => <Test/>}/>
                <Route path="/error404" render={() => <ErrorPage/>}/>
            </Switch>
        </div>
    );
}

export default App;
