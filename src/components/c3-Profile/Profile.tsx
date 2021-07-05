import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {LogoutTC} from "../../reducers/r2-LoginReducer";
import {Redirect, useHistory} from "react-router-dom";
import {Preloader} from "../c8-Preloader/Preloader";
import {DisabledButton} from "../../common/c4-DisabledButton/DisabledButton";
import {ResponseType} from "../../api/LoginAPI";


export const Profile = React.memo(function () {
        const history = useHistory();
        const dispatch = useDispatch()
        const profile = useSelector<AppRootStateType, ResponseType | null>(state => state.login.profile)
        const isInitialised = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)

        const authLogoutHandler = () => {
            dispatch(LogoutTC())
            history.push('/log_in');
        }

        // if (!isInitialised) {
        //     return <Redirect to={'/log_in'}/>
        // }

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
                             {profile && <div>
                                 {profile.name}
                             </div>}
                         </span>
                     </span>
                </div>
            </div>
        )

    }
)