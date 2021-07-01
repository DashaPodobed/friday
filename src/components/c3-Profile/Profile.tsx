import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {LogoutTC} from "../../reducers/r2-LoginReducer";
import {Redirect} from "react-router-dom";
import {ProfileState} from "../../api/LoginAPI";
import {setUserProfileTC} from "../../reducers/r3-ProfileReducer";
import {Preloader} from "../c8-Preloader/Preloader";
import {DisabledButton} from "../../common/c4-DisabledButton/DisabledButton";

export const Profile = React.memo( function () {
    console.log("profile")
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)
    const profile = useSelector<AppRootStateType, ProfileState['userData']>(state => state.profile.userData)

    useEffect(() => {
        dispatch(setUserProfileTC())
    }, [dispatch])

    const authLogoutHandler = () => {
        console.log("log out")
        dispatch(LogoutTC())
    }

    if (!isInitialized) {
        return <Redirect to={"/log_in"}/>
    }
    
    return (
        <div>
            <Preloader/>
            <div>
                <DisabledButton title={"Log Out"} callback={authLogoutHandler}/>
            </div>
            <div>
                     <span>
                         <div>
                             {profile && <img src={profile.avatar}
                                              alt={"avatar"}/>}
                         </div>
                         <span>
                             {profile &&
                             <div>
                                 {profile.name}
                             </div>}
                         </span>

                     </span>
            </div>
        </div>
    )

})