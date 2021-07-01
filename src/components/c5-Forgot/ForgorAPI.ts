import axios from "axios";

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

export const forgotAPI = {
    forgot(email: string) {
        return instance.post<ResponseDataType>("auth/forgot", {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                      <a href='http://localhost:3000/friday#/set_new_password/$token$'>link</a></div>`
        })
    }
}

type ResponseDataType = {
    error: string
}