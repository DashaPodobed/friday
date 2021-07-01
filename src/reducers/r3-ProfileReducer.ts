import {Dispatch, Reducer} from 'redux'

import {authAPI, ProfileState, ResponseType} from "../api/LoginAPI";
import {setLoginStatusAC} from "./r2-LoginReducer";

const initialState: ProfileState = {}

export const ProfileReducer: Reducer<ProfileState, ActionType> = (state, action) => {
    if (!state) return initialState
    switch (action.type) {
        case "SET-USER-PROFILE":
            return {...state, userData: action.payload}
        default:
            return state
    }
}

export const setUserProfileAC = (profile: ResponseType) => {
    return {type: "SET-USER-PROFILE", payload: profile}
}

type setUserProfileAT = ReturnType<typeof setUserProfileAC>

type ActionType = setUserProfileAT

export const setUserProfileTC = () =>
    (dispatch: Dispatch) => {
        dispatch(setLoginStatusAC('loading'))
        authAPI.me()
            .then(res => {
                dispatch(setUserProfileAC(res.data))
                dispatch(setLoginStatusAC('succeeded'))
            })
    }