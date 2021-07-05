import React from "react";
import {getPacksAPI} from "../../api/GetPacksAPI";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

export const Pagination: React.FC = () => {

    const userId = useSelector<AppRootStateType, string>(state => state.profile.userData ? state.profile.userData._id : "")

    const getPacks = () => {
        getPacksAPI.getPacks(userId)
    }

    return (
        <div><button onClick={getPacks}>getPacks</button>pagination</div>
    )
}