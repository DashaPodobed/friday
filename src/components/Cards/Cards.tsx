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
import {ErrorSnackbar} from "../с6-Error/ErrorSnackbar";
import {AppRootStateType} from "../../app/store";
import {ResponseType} from "../../api/LoginAPI";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Cards() {

    const dispatch = useDispatch()
    const profileId = useSelector<AppRootStateType, string>(state => state.login.profile._id)
    const isInitialised = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)
    const cards = []

    const classes = useStyles();

    // if (profile === null) {
    //     return (
    //         <ErrorSnackbar/>
    //     )
    // }

    if (!profileId) {
        return <Redirect to={'/log_in'}/>
    }

    return (
        <>
            <button>add</button>
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
                            {/*{cards.map((card) => {*/}
                            {/*    return (*/}
                            {/*        <TableRow key={card._id}>*/}
                            {/*            <TableCell align="left">{card.name}</TableCell>*/}
                            {/*            <TableCell align="right">{card.cardsCount}</TableCell>*/}
                            {/*            <TableCell align="right">{card.updated}</TableCell>*/}
                            {/*            <TableCell align="right">*/}
                            {/*                <button onClick={}>update</button>*/}
                            {/*                <button onClick={}>del</button>*/}
                            {/*            </TableCell>*/}
                            {/*            <TableCell align="right"><a>click</a></TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    )*/}
                            {/*})}*/}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}