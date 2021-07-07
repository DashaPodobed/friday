import {instance} from "./a1-instance";

export const PacksAPI = {
    async getPacks(id?: string | null, pageCount?: number | null, page?: number | null,
                   packName?: string | null, min?: number | null, max?: number | null, sortPacks?: string | null) {
        const response = await instance.get(
            `cards/pack`,
            {
                params: {
                    user_id: id,
                    pageCount,
                    page,
                    packName,
                    min,
                    max,
                    sortPacks
                }
            }
        )
        return response
    },
    async createCardPack(){
        const response = await instance.post(
            'cards/pack',
            {cardsPack: {name: "new pack 3.0"}}
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
            {cardsPack: {_id: id}}
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
