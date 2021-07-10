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
                maxCardsCount: action.data.maxCardsCount,
                minCardsCount: action.data.minCardsCount,
                page: action.data.page,
                pageCount: action.data.pageCount
            }
        case "PACKS/CREATE-NEW-CARD":
            return {...state}
        case "PACKS/SET-PAGINATION-DATA":
            return {
                ...state,
                cardPacks: [...action.data],
                page: action.page,
                pageCount: action.pageCount,
                minCardsCount: action.minCardsCount,
                maxCardsCount: action.maxCardsCount
            }
        // case "PACKS/SEARCH-NAME":
        //     return {
        //         ...state,
        //         cardPacks: action.data.filter(p => p.name === action.packName)
        //     }
        default:
            return state
    }
}

export const setPacksListAC = (data: InitialStateType) => ({type: "PACKS/SET-PACKS-LIST", data} as const)
export const createNewCardsAC = () => ({type: "PACKS/CREATE-NEW-CARD"} as const)
export const setPaginationDataAC = (page: number | undefined, pageCount: number | undefined, minCardsCount: number | undefined, maxCardsCount: number | undefined, data: Array<ResponsePackType>) => (
    {type: "PACKS/SET-PAGINATION-DATA", page, pageCount, minCardsCount, maxCardsCount, data} as const)
export const searchNameAC = (packName: string | null, data: Array<ResponsePackType>) => (
    {type: "PACKS/SEARCH-NAME", packName, data} as const)

export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type CreateNewCardsAT = ReturnType<typeof createNewCardsAC>
export type SetPaginationDataAT = ReturnType<typeof setPaginationDataAC>
export type SearchNameAT = ReturnType<typeof searchNameAC>

type ActionType = SetPacksListAT | CreateNewCardsAT | SetPaginationDataAT | SearchNameAT

export const setPacksListTC = (userId?: string | null, pageCount?: number | null, page?: number | null, packName?: string) =>
    (dispatch: Dispatch) => {
        PacksAPI.getPacks(userId, pageCount, page, packName)
            .then(res => {
                dispatch(setPacksListAC(res.data))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const setPaginationDataTC = (pageCount?: number, page?: number, minCardsCount?: number, maxCardsCount?: number, sortPacks?: string) =>
    (dispatch: Dispatch) => {
        PacksAPI.getPacks(null, pageCount, page, null, minCardsCount, maxCardsCount, sortPacks)
            .then(res => {
                dispatch(setPaginationDataAC(page, pageCount, minCardsCount, maxCardsCount, res.data.cardPacks))
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
export const deleteCardPackTC = (id: string, userId: string) =>
    (dispatch: any) => {
        PacksAPI.deleteCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(userId))
            })
    }
export const updateCardPackTC = (id: string) =>
    (dispatch: any) => {
        PacksAPI.updateCardPack(id)
            .then(res => {
                dispatch(setPacksListTC(id))
            })
    }
