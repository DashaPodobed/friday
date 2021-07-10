import {Dispatch} from "redux";
import {setErrorMessageAC} from "./r6-ErrorReducer";
import {CardsAPI, ResponseCardType} from "../api/CardsAPI";

const InitialState: any = []
// Array<ResponseCardType>
export const CardsReducer = (state: Array<ResponseCardType> = InitialState, action: ActionType): Array<ResponseCardType> => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return action.data
        // return state.map(st => st._id === action.id ? {...st, name: action.name} : st)
        default:
            return state
    }
}

export const setCardsAC = (data: any) => ({type: "CARDS/SET-CARDS", data} as const)

export type setCardsAT = ReturnType<typeof setCardsAC>

type ActionType = setCardsAT

export const setCardsTC = (packId?: string | undefined) =>
    (dispatch: Dispatch) => {
        CardsAPI.getCards(packId)
            .then(res => {
                dispatch(setCardsAC(res.data.cards))
                console.log(res.data.cards)
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(setErrorMessageAC(error))
            })
    }

export const createNewCardTC = (cardsPack_id: string) =>
    (dispatch: any) => {
        CardsAPI.createNewCard(cardsPack_id)
            .then(res => {
                dispatch(setCardsTC(cardsPack_id))
            })
    }
export const deleteCardTC = (id: string) =>
    (dispatch: any) => {
        CardsAPI.deleteCard(id)
            .then(res => {
                dispatch(setCardsTC())
            })
    }
export const updateCardTC = (id: string) =>
    (dispatch: any) => {
        CardsAPI.updateCard(id)
            .then(res => {
                dispatch(setCardsTC(id))
            })
    }
