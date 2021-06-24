import React from "react";

const InitialState = {}
type InitialStateType = typeof InitialState

export const LogUpReducer = (state: InitialStateType = InitialState, action: ActionType) => {
    switch (action){
        default:
            return state
    }
}

type ActionType = {}