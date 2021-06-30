import axios from "axios"

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
    headers: {
        'APY-KEY': '5a725941-ea89-49be-a495-54849d967e55'
    }
})

export const authAPI =  {
    login(data: loginParamsType){
        return instance.post<ResponseType>('auth/login', data)
    },
    me(){
        return instance.post<ResponseType>( 'auth/me')
    },
    logout(){
        return instance.delete<ResponseType>( 'auth/me')
    },

}

export type ResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    create: number,
    update: number,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string
}
export type loginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type ProfileState = {
    userData?: ResponseType | undefined
}
