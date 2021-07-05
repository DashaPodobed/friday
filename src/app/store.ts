import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {ProfileReducer} from "../reducers/r3-ProfileReducer";
import {LogUpReducer} from "../reducers/r1-LogupReducer";
import {SetPassReducer} from "../reducers/r4-SetPassReducer";
import {ForgotReducer} from "../reducers/r7-ForgotReducer";
import {LoginReducer} from "../reducers/r2-LoginReducer";
import {PreloaderReducer} from "../reducers/r8-PreloaderReducer";
import {ErrorReducer} from "../reducers/r6-ErrorReducer";

const rootReducer = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    logup: LogUpReducer,
    setPass: SetPassReducer,
    forgot: ForgotReducer,
    error: ErrorReducer,
    status: PreloaderReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
