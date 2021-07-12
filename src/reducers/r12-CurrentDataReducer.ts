const InitialState = {
    packName: "",
    min: 0,
    max: 1000,
    currentPageCount: 4
}
export type CurrentDataType = typeof InitialState

export const CurrentDataReducer = (state: CurrentDataType = InitialState, action: ActionType): CurrentDataType => {
    switch (action.type) {
        case "SET-CURRENT-DATA":
            return {
                ...state,
                packName: action.packName,
                min: action.min,
                max: action.max
            }

        case "SET-PAGE-COUNT":
            return {...state, currentPageCount: action.pageCount}

        default:
            return state
    }
}

export const setCurrentDataAC = (packName: string, min: number, max: number) => ({
    type: "SET-CURRENT-DATA",
    packName,
    min,
    max
} as const)

export const setPageCountAC = (pageCount: number) => ({
    type: "SET-PAGE-COUNT", pageCount
} as const)

type setCurrentDataAT = ReturnType<typeof setCurrentDataAC>
type setPageCountAT = ReturnType<typeof setPageCountAC>

type ActionType = setCurrentDataAT | setPageCountAT