import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const logUpAPI = {
    login(data: LogUpType) {
        const promise = instance.post<ResponseType<{}>>('auth/register', data);
        return promise;
    }
}

export type LogUpType = {
    email: string,
    password: string,
}
export type ResponseType<D = {}> = {
    data: D,
    error?: string
}