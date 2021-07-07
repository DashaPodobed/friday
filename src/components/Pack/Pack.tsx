import React, {ChangeEvent, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    createNewCardPackTC,
    deleteCardPackTC,
    setPacksListTC,
    setPaginationDataTC,
    updateCardPackTC
} from "../../reducers/r9-PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {ErrorSnackbar} from "../Error/ErrorSnackbar";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";
import {ResponsePackType} from "../../api/PacksAPI";
import {setCardsTC} from "../../reducers/r10-CardsReducer";
import {useHistory} from "react-router-dom";
import {Paginator} from "../../features/pagination/Paginator";
import {Search} from "../../features/search/Search";
import {SortPacks} from "../../features/SortPacks/SortPacks";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DenseTable() {

    const dispatch = useDispatch()
    const history = useHistory()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const packs = useSelector<AppRootStateType, Array<ResponsePackType>>(state => state.packs.cardPacks)
    const {cardPacksTotalCount, pageCount, page} = useSelector((state: AppRootStateType) => state.packs)
    const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)

    useEffect(() => {
            dispatch(setPacksListTC())
    }, [])


    const setPrivatePacks = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivatePacks(e.currentTarget.checked)
        if (isPrivatePacks) {
            dispatch(setPacksListTC())
        } else {
            dispatch(setPacksListTC(profile._id))
        }
    }

    const classes = useStyles();

    if (!profile) {
        return (
            <ErrorSnackbar/>
        )
    }

    const addNewCardPack = () => {
        dispatch(createNewCardPackTC(profile._id))
    }

    const selectCallback = (value: string) => {
        dispatch(setPaginationDataTC(+value))
    }

    return (
        <>
            <Search/>
            Private packs
            <input type={"checkbox"} checked={isPrivatePacks} onChange={setPrivatePacks}/>
            <button onClick={addNewCardPack}>add</button>
            <div style={{display: "flex", justifyContent: "center"}}>
                <TableContainer component={Paper} style={{width: "60%"}}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name<SortPacks title={"name"}/></TableCell>
                                <TableCell align="right">cardsCount<SortPacks title={"cardsCount"}/></TableCell>
                                <TableCell align="right">updated<SortPacks title={"updated"}/></TableCell>
                                <TableCell align="right">buttons</TableCell>
                                <TableCell align="right">cards</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packs.map((pack) => {
                                // debugger
                                const deleteCardPack = () => {
                                    dispatch(deleteCardPackTC(pack._id))
                                }
                                const updateCardPack = () => {
                                    dispatch(updateCardPackTC(pack._id))
                                }
                                const getCards = () => {
                                    dispatch(setCardsTC(pack._id))
                                    history.push('/cards')
                                }

                                return (
                                    <TableRow key={pack._id}>
                                        <TableCell align="left">{pack.name}</TableCell>
                                        <TableCell align="right">{pack.cardsCount}</TableCell>
                                        <TableCell align="right">{pack.updated}</TableCell>
                                        <TableCell align="right">
                                            <button onClick={updateCardPack}>update</button>
                                            <button onClick={deleteCardPack}>del</button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button onClick={getCards}>cards</button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Paginator totalItemsCount={cardPacksTotalCount} currentPage={page} pageSize={pageCount}/>
                <span>
                    <select onChange={(e) => selectCallback(e.currentTarget.value)}>
                        <option>2</option>
                        <option>4</option>
                        <option>6</option>
                    </select>
                </span>
            </div>
        </>
    );
}