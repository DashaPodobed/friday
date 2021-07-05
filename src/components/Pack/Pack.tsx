import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {createNewCardPackTC, deleteCardPackTC, setPacksListTC, updateCardPackTC} from "../../reducers/r9-PacksReducer";
import {useDispatch, useSelector} from "react-redux";
import {ErrorSnackbar} from "../с6-Error/ErrorSnackbar";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";
import {ResponsePackType} from "../../api/PacksAPI";
import {setCardsTC} from "../../reducers/r10-CardsReducer";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DenseTable() {

    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ResponseType>(state => state.login.profile)
    const packs = useSelector<AppRootStateType, Array<ResponsePackType>>(state => state.packs)

    useEffect(() => {
        dispatch(setPacksListTC(profile._id))
    }, [])

    const classes = useStyles();

    if (!profile) {
        return (
            <ErrorSnackbar/>
        )
    }

    const addNewCardPack = () => {
        dispatch(createNewCardPackTC(profile._id))
    }
    if (!profile._id) {
        return <Redirect to={'/log_in'}/>
    }

    return (
        <>
            <input type={"checkbox"}></input>
            <button onClick={addNewCardPack}>add</button>
            <div style={{display: "flex", justifyContent: "center"}}>
                <TableContainer component={Paper} style={{width: "60%"}}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">cardsCount</TableCell>
                                <TableCell align="right">updated</TableCell>
                                <TableCell align="right">buttons</TableCell>
                                <TableCell align="right">cards</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packs.map((pack) => {
                                const deleteCardPack = () => {
                                    dispatch(deleteCardPackTC(pack._id))
                                }
                                const updateCardPack = () => {
                                    dispatch(updateCardPackTC(pack._id))
                                }
                                const getCards = () => {
                                    dispatch(setCardsTC(pack._id))
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
        </>
    );
}