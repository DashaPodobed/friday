import {Dispatch} from "redux";
import {authAPI, loginParamsType} from "../auth/auth";
import {setPreloaderStatusAC} from "./r8-PreloaderReducer";
import {setErrorMessageAC} from "./c6-ErrorReducer";

const InitialState: InitialStateType = {
    isLoggedIn: false,
    status: "idle",
    isInitialized: false,
}
type InitialStateType = {
    isLoggedIn: boolean,
    status: RequestStatusType,
    isInitialized: boolean,
}

export const LoginReducer = (state: InitialStateType = InitialState, action: LoginReducerType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-STATUS':
            return {...state, status: action.status}
        case "login/SET-IS-ISINITIALISED":
            return {...state, isInitialized: action.Initialized}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setLoginStatusAC = (status: RequestStatusType) =>
    ({type: 'login/SET-STATUS', status} as const)
export const setIsInitializedAC = (Initialized: boolean) =>
    ({type: 'login/SET-IS-ISINITIALISED', Initialized} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type setIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>
type setLoginStatusAT = ReturnType<typeof setLoginStatusAC>
type setIsInitializedAT = ReturnType<typeof setIsInitializedAC>

type LoginReducerType = setIsLoggedInAT
    | setLoginStatusAT
    | setIsInitializedAT

const LogInLogOutFlow = (dispatch: Dispatch, value: boolean) => {
    dispatch(setIsLoggedInAC(value))
    dispatch(setIsInitializedAC(value))
}

export const LoginTC = (data: loginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setPreloaderStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                LogInLogOutFlow(dispatch, true)
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
            .finally(() => {
                dispatch(setPreloaderStatusAC('succeeded'))
            })
    }

export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(setPreloaderStatusAC('loading'))
    authAPI.logout().then(res => {
        LogInLogOutFlow(dispatch, false)
        dispatch(setPreloaderStatusAC('succeeded'))
    })
}

