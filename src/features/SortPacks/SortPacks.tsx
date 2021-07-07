import React from "react";
import {useDispatch} from "react-redux";
import {setPaginationDataTC} from "../../reducers/r9-PacksReducer";

type SortPacksPropsType = {
    title: string
}

export const SortPacks: React.FC<SortPacksPropsType> = ({title}) => {

    const dispatch = useDispatch()

    const sortHandler1 = () => {
        dispatch(setPaginationDataTC(undefined, undefined, undefined, undefined, `1${title}`))
    }
    const sortHandler0 = () => {
        dispatch(setPaginationDataTC(undefined, undefined, undefined, undefined, `0${title}`))
    }
    return (
        <div>
            <div>
                <button onClick={sortHandler1}>/\</button>
            </div>
            <div>
                <button onClick={sortHandler0}>\/</button>
            </div>
        </div>
    )
}