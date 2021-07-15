import {Dispatch} from "redux";
import {PacksAPI, ResponsePackType} from "../api/PacksAPI";
import {setErrorMessageAC} from "./r6-ErrorReducer";

const InitialState = {
    cardPacks: [] as Array<ResponsePackType>,
    cardPacksTotalCount: 2,
    maxCardsCount: 0 as number | undefined,
    minCardsCount: 1000 as number | undefined,
    page: 1 as number | undefined,
    pageCount: 4 as number | undefined
}

type InitialStateType = typeof InitialState

export const PacksReducer = (state: InitialStateType = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS-LIST":
            return {
                ...state,
                cardPacks: [...action.data.cardPacks],
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                maxCardsCount: action.maxCardsCount,
                minCardsCount: action.minCardsCount,
                page: action.page,
                pageCount: action.pageCount
            }
        case "PACKS/CREATE-NEW-CARD":
            return {...state}
        default:
            return state
    }
}

export const setPacksListAC = (data: InitialStateType, userId?: string, pageCount?: number, page?: number,
                               packName?: string, minCardsCount?: number, maxCardsCount?: number,
                               sortPacks?: string) => ({
    type: "PACKS/SET-PACKS-LIST", data, userId, pageCount,
    page, packName, minCardsCount, maxCardsCount, sortPacks
} as const)
export const createNewCardsAC = () => ({type: "PACKS/CREATE-NEW-CARD"} as const)

export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type CreateNewCardsAT = ReturnType<typeof createNewCardsAC>

type ActionType = SetPacksListAT | CreateNewCardsAT

export const setPacksListTC = (userId?: string, pageCount?: number, page?: number,
                               packName?: string, minCardsCount?: number, maxCardsCount?: number,
                               sortPacks?: string) =>
    (dispatch: Dispatch) => {
        PacksAPI.getPacks(userId, pageCount, page, packName, minCardsCount, maxCardsCount, sortPacks)
            .then(res => {
                dispatch(setPacksListAC(res.data, userId, pageCount, page, packName, minCardsCount, maxCardsCount, sortPacks))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const createNewCardPackTC = (userId: string, title: string) =>
    (dispatch: any) => {
        PacksAPI.createCardPack(title)
            .then(res => {
                dispatch(setPacksListTC(userId))
            })
    }
export const deleteCardPackTC = (id: string, userId: string) =>
    (dispatch: any) => {
        PacksAPI.deleteCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(userId))
            })
    }
export const updateCardPackTC = (userId: string, id: string, title: string) =>
    (dispatch: any) => {
        PacksAPI.updateCardPack(id, title)
            .then(res => {
                dispatch(setPacksListTC(userId))
            })
    }
