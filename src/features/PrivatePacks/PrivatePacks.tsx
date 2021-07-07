import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPacksListTC} from "../../reducers/r9-PacksReducer";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";

export const PrivatePacks: React.FC = () => {

    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const dispatch = useDispatch()

    const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)

    const setPrivatePacks = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivatePacks(e.currentTarget.checked)
    }

    if (isPrivatePacks) {
        dispatch(setPacksListTC(profile._id))
    }
    // if (!isPrivatePacks) {
    //     dispatch(setPacksListTC())
    // }

    return (
        <div>
            <div>
                <input type={"checkbox"} checked={isPrivatePacks} onChange={setPrivatePacks}/>
            </div>
        </div>
    )
}