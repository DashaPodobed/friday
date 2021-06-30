const InitialState = {}
type InitialStateType = typeof InitialState

export const TestReducer = (state: InitialStateType = InitialState, action: ActionType) => {
    switch (action) {
        default:
            return state
    }
}

type ActionType = {}