import React, {useState} from "react";
import s from "./Paginator.module.css";
import {useDispatch} from "react-redux";
import {setPaginationDataTC} from "../../reducers/r9-PacksReducer";

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize?: number
    currentPage?: number
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = (
    {totalItemsCount, pageSize, currentPage, portionSize = 10}
) => {

    const dispatch = useDispatch()
    const pagesCount = Math.ceil(totalItemsCount / (pageSize ? pageSize : 1))

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const prevPacksHandler = () => {
        setPortionNumber(portionNumber - 1)
    }
    const nextPacksHandler = () => {
        setPortionNumber(portionNumber + 1)
    }

    const onPageChanged = (page: number) => {
        dispatch(setPaginationDataTC(pageSize, page))
    }

    return <div className={s.paginator}>
        {portionNumber > 1 &&
        <button onClick={prevPacksHandler}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span key={p}
                    // className={cn({
                    //     [s.selectedPage]: currentPage === p
                    // }, s.pageNumber)}
                             className={currentPage === p ? s.selectedPage : s.pageNumber}
                             onClick={(e) => {
                                 onPageChanged(p)
                             }}
                >{p}</span>
            })}
        {portionCount > portionNumber &&
        <button onClick={nextPacksHandler}>NEXT</button>}
    </div>
}