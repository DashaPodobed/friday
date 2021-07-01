import axios from "axios";

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export const setPassAPI = {
    setPass(resetPasswordToken: string, password: string) {
        return instance.post<ResponseDataType>("auth/set-new-password", {resetPasswordToken, password})
    }
}

type ResponseDataType = {
    error: string
}