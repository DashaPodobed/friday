import {Dispatch} from "redux";
import {setErrorMessageAC} from "./r6-ErrorReducer";
import {CardsAPI, ResponseCardType} from "../api/CardsAPI";

const InitialState: Array<ResponseCardType> = []

export const PacksReducer = (state: Array<ResponseCardType> = InitialState, action: ActionType): Array<ResponseCardType> => {
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

export const setPacksListAC = (data: Array<ResponseCardType>) => ({type: "PACKS/SET-PACKS-LIST", data} as const)
export const createNewCardsAC = () => ({type: "PACKS/CREATE-NEW-CARD"} as const)

export type setPacksListAT = ReturnType<typeof setPacksListAC>
export type createNewCardsAT = ReturnType<typeof createNewCardsAC>

type ActionType = setPacksListAT | createNewCardsAT

export const setCardsTC = (packId: string) =>
    (dispatch: Dispatch) => {
        CardsAPI.getCards(packId)
            .then(res => {
                console.log(res.data.cards)
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

// export const createNewCardPackTC = (userId: string) =>
//     (dispatch: any) => {
//         PacksAPI.createCardPack()
//             .then(res => {
//                 dispatch(setPacksListTC(userId))
//             })
//     }
// export const deleteCardPackTC = (id: string) =>
//     (dispatch: any) => {
//         PacksAPI.deleteCardPack(id)
//             .then(res => {
//                 dispatch(setPacksListTC(id))
//             })
//     }
// export const updateCardPackTC = (id: string) =>
//     (dispatch: any) => {
//         PacksAPI.updateCardPack(id)
//             .then(res => {
//                 dispatch(setPacksListTC(id))
//             })
//     }
