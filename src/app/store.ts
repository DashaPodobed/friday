import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {LogUpReducer} from "../reducers/r1-LogupReducer";
import {SetPassReducer} from "../reducers/r4-SetPassReducer";
import {ForgotReducer} from "../reducers/r7-ForgotReducer";
import {LoginReducer} from "../reducers/r2-LoginReducer";
import {PreloaderReducer} from "../reducers/r8-PreloaderReducer";
import {ErrorReducer} from "../reducers/r6-ErrorReducer";
import {PacksReducer} from "../reducers/r9-PacksReducer";
import {ProfileReducer} from "../reducers/r3-ProfileReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    profile: ProfileReducer,
    login: LoginReducer,
    logup: LogUpReducer,
    setPass: SetPassReducer,
    forgot: ForgotReducer,
    error: ErrorReducer,
    status: PreloaderReducer,
    packs: PacksReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
