import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ResponseCardType} from "../../api/CardsAPI";
import {createNewCardTC, deleteCardTC, setCardsTC, updateCardTC} from "../../reducers/r10-CardsReducer";
import {useParams} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Cards() {
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, Array<ResponseCardType>>(state => state.cards)
    const {cardsPackId} = useParams<{ cardsPackId: string }>()

    useEffect(() => {
        dispatch(setCardsTC(cardsPackId))
    }, [])

    const classes = useStyles();

    return (
        <>
            {/*<button onClick={()=>dispatch(setCardsTC())}>setCards</button>*/}
            <div style={{display: "flex", justifyContent: "center"}}>
                <TableContainer component={Paper} style={{width: "60%"}}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>question</TableCell>
                                <TableCell align="right">answer</TableCell>
                                <TableCell align="right">grade</TableCell>
                                <TableCell align="right">updated</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((card) => {
                                const createNewCard = () => {
                                    dispatch(createNewCardTC(card.cardsPack_id))
                                }
                                const deleteCard = () => {
                                    dispatch(deleteCardTC(card._id))
                                }
                                const updateCard = () => {
                                    dispatch(updateCardTC(card._id))
                                }
                                return (
                                    <TableRow key={card._id}>
                                        <TableCell align="left">{card.question}</TableCell>
                                        <TableCell align="right">{card.answer}</TableCell>
                                        <TableCell align="right">{card.grade}</TableCell>
                                        <TableCell align="right">{card.updated}</TableCell>
                                        <TableCell align="right">
                                            <button onClick={createNewCard}>add</button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <button onClick={updateCard}>update
                                            </button>
                                            <button onClick={deleteCard}>del
                                            </button>
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