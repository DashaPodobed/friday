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
    updateCardPackTC
} from "../../reducers/r9-PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {ErrorSnackbar} from "../Error/ErrorSnackbar";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";
import {ResponsePackType} from "../../api/PacksAPI";
import {useHistory} from "react-router-dom";
import {Paginator} from "../../features/pagination/Paginator";
import {Search} from "../../features/search/Search";
import {SortPacks} from "../../features/SortPacks/SortPacks";
import {setPageCountAC} from "../../reducers/r12-CurrentDataReducer";
import {Modal} from "../ModalWindow/ModalWindow";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DenseTable() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {packName, min, max, currentPageCount} = useSelector((state: AppRootStateType) => state.currentData)
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const packs = useSelector<AppRootStateType, Array<ResponsePackType>>(state => state.packs.cardPacks)
    const {cardPacksTotalCount, pageCount, page} = useSelector((state: AppRootStateType) => state.packs)
    const [isPrivatePacks, setIsPrivatePacks] = useState<boolean>(false)

    useEffect(() => {
        dispatch(setPacksListTC())
    }, [])

    const [isCreate, setCreate] = useState<boolean>(false)
    const [updatingPackId, setUpdatingPackId] = useState("")
    const [deletedPackId, setDeletedPackId] = useState("")
    const [title, setTitle] = useState<string>('')
    const onClose = () => setCreate(false)
    const onCloseUpdate = () => setUpdatingPackId('')
    const onCloseDelete = () => setDeletedPackId('')

    const setPrivatePacks = (e: ChangeEvent<HTMLInputElement>) => {
        setIsPrivatePacks(e.currentTarget.checked)
        if (isPrivatePacks) {
            dispatch(setPacksListTC())
        } else {
            dispatch(setPacksListTC(profile._id, currentPageCount, undefined, packName, min, max))
        }
    }

    const classes = useStyles();

    if (!profile) {
        return (
            <ErrorSnackbar/>
        )
    }

    const addNewCardPack = () => {
        dispatch(createNewCardPackTC(profile._id, title))
        setTitle('')
        setCreate(false)
    }

    const selectCallback = (value: string) => {
        dispatch(setPacksListTC(undefined, +value, undefined, packName, min, max))
        dispatch(setPageCountAC(+value))
    }

    const createTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const deleteCardPack = (packId: string) => {
        dispatch(deleteCardPackTC(packId, profile._id))
        setUpdatingPackId('')
    }

    return (
        <>
            {isCreate &&
            <Modal
                title={"Enter title"}
                content={<input value={title} onChange={createTitle}/>}
                footer={<tr>
                    <button onClick={addNewCardPack}>add</button>
                    <button onClick={onClose}>Close</button>
                </tr>}
                onClose={onClose}
            />
            }
            <Search/>
            Private packs
            <input type={"checkbox"} checked={isPrivatePacks} onChange={setPrivatePacks}/>
            <button onClick={() => setCreate(true)}>add</button>
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
                                const getQuestions = () => {
                                    history.push(`/learn/${pack._id}`)
                                }

                                const updateCardPack = () => {
                                    dispatch(updateCardPackTC(pack.user_id, pack._id, title))
                                    setTitle('')
                                    setUpdatingPackId('')
                                }
                                const getCards = () => {
                                    history.push(`/cards/${pack._id}`)
                                }
                                return (
                                    <>
                                        {updatingPackId === pack._id &&
                                        <Modal
                                            title={"Enter new title"}
                                            content={<input value={title} onChange={createTitle}/>}
                                            footer={<tr key={pack._id}>
                                                <button onClick={updateCardPack}>update</button>
                                                <button onClick={onCloseUpdate}>Close</button>
                                            </tr>}
                                            onClose={()=>setUpdatingPackId('')}
                                        />
                                        }

                                        {deletedPackId === pack._id &&
                                        <Modal
                                            title={"Do you want delete?"}
                                            content={`Click "yes" if you want`}
                                            footer={<tr key={pack._id}>
                                                <button onClick={() => deleteCardPack(pack._id)}>Yes</button>
                                                <button onClick={onCloseDelete}>No</button>
                                            </tr>}
                                            onClose={onCloseDelete}
                                        />
                                        }
                                        <TableRow key={pack._id}>
                                            <TableCell align="left" key={pack._id}>{pack.name}</TableCell>
                                            <TableCell align="right">{pack.cardsCount}</TableCell>
                                            <TableCell align="right">{pack.updated}</TableCell>
                                            <TableCell align="right">
                                                <button onClick={()=>setUpdatingPackId(pack._id)}>update</button>
                                                <button onClick={() =>setDeletedPackId(pack._id)}>del</button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <button onClick={getCards}>cards</button>
                                                <button onClick={getQuestions}>learn</button>
                                            </TableCell>
                                        </TableRow>
                                    </>
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
                                <option>4</option>
                                <option>6</option>
                                <option>8</option>
                                </select>
                                </span>
                                </div>
                                </>
                                );
                            }