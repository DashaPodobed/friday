import {Dispatch} from "redux";
import {PacksAPI, ResponsePackType} from "../api/PacksAPI";
import {setErrorMessageAC} from "./r6-ErrorReducer";

const InitialState: Array<ResponsePackType> = []

export const PacksReducer = (state: Array<ResponsePackType> = InitialState, action: ActionType): Array<ResponsePackType> => {
    switch (action.type) {
        case "PACKS/SET-PACKS-LIST":
            return action.data
        case "PACKS/CREATE-NEW-CARD":
            return {...state}
        // return state.map(st => st._id === action.id ? {...st, name: action.name} : st)
        default:
            return state
    }
}

export const setPacksListAC = (data: Array<ResponsePackType>) => ({type: "PACKS/SET-PACKS-LIST", data} as const)
export const createNewCardsAC = () => ({type: "PACKS/CREATE-NEW-CARD"} as const)

export type setPacksListAT = ReturnType<typeof setPacksListAC>
export type createNewCardsAT = ReturnType<typeof createNewCardsAC>

type ActionType = setPacksListAT | createNewCardsAT

export const setPacksListTC = (userId: string) =>
    (dispatch: Dispatch) => {
        PacksAPI.getPacks(userId)
            .then(res => {
                dispatch(setPacksListAC(res.data.cardPacks))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const createNewCardPackTC = (userId: string) =>
    (dispatch: any) => {
        PacksAPI.createCardPack()
            .then(res => {
                dispatch(setPacksListTC(userId))
            })
    }
export const deleteCardPackTC = (id: string) =>
    (dispatch: any) => {
        PacksAPI.deleteCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(id))
            })
    }
export const updateCardPackTC = (id: string) =>
    (dispatch: any) => {
        PacksAPI.updateCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(id))
            })
    }
