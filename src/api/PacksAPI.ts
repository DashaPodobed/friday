import axios from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})


export const PacksAPI = {
    async getPacks(id: string) {
        const response = await instance.get(
            `cards/pack`,
            {
                params: {
                    user_id: id,
                    pageCount: 6,
                    page: 1,
                    // packName: "friday"
                    min: 1,
                    max: 10,
                    // sortPacks: 0 + "updated"
                }
            }
        )
        return response
    },
    async createCardPack(){
        const response = await instance.post(
            'cards/pack',
            {CardsPack: {name: "new pack 2.0"}}
        )
        return response
    },
    async deleteCardPack(id: string){
        const response = await instance.delete(
            'cards/pack',
            {params: {id}}
        )
        return response
    },
    async updateCardPack(id: string){
        const response = await instance.put(
            'cards/pack',
            {cardsPack: {id}}
        )
        return response
    }
}

export type ResponsePackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    deckCover: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
}


// export type PacksListType = {
//     data: ResponsePackType[]
//     error: string
// }
