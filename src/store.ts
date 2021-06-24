import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {ProfileReducer} from "./reducers/r3-ProfileReducer";
import {LogInReducer} from "./reducers/r2-LoginReducer";
import {LogUpReducer} from "./reducers/r1-LogupReducer";
import {EnterANewPasswordReducer} from "./reducers/r4-EnterANewPassword";
import {ErrorPageReducer} from "./reducers/r5-ErrorPage";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    profile: ProfileReducer,
    login: LogInReducer,
    logup: LogUpReducer,
    newPassword: EnterANewPasswordReducer,
    errorPage: ErrorPageReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
