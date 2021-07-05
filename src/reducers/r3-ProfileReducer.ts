import { ResponseType} from "../api/LoginAPI";

const initialState = {
    profile: {} as ResponseType
}
type InitialStateType = typeof initialState

export const ProfileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-USER-PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}

export const setUserProfileAC = (profile: ResponseType) => {
    return {type: "PROFILE/SET-USER-PROFILE", profile} as const
}

type setUserProfileAT = ReturnType<typeof setUserProfileAC>

type ActionType = setUserProfileAT

