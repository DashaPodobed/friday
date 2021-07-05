import axios from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})


export const CardsAPI = {
    async getCards(cardsPack_id: string) {
        const response = await instance.get(
            'cards/card',
            {params: {cardsPack_id}}
        )
        return response
    }

//     async createCardPack() {
//         const response = await instance.post(
//             'cards/pack',
//             {cardsPack: {name: "new pack 2.0"}}
//         )
//         return response
//     },
//     async deleteCardPack(id: string) {
//         const response = await instance.delete(
//             'cards/pack',
//             {params: {id}}
//         )
//         return response
//     },
//     async updateCardPack(id: string) {
//         const response = await instance.put(
//             'cards/pack',
//             {cardsPack: {id}}
//         )
//         return response
//     }
}

export type ResponseCardType = {
    cards: [{
        answer: string
        question: string
        cardsPack_id: string
        grade: number
        rating: number
        shots: number
        type: string
        user_id: string
        created: string
        updated: string
        __v: number
        _id: string
    }],
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
