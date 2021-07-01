import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {NavLink} from "react-router-dom";
import style from "./AppBar.module.css"
import { Menu, MenuItem} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const ITEM_HEIGHT = 48;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <nav className={style.nav}>
                                <MenuItem>
                                </MenuItem>
                                <MenuItem>
                                    <span className={style.item}>
                                    <NavLink to="/log_up" activeClassName={style.activeLink}>Log Up</NavLink>
                                        </span>
                                </MenuItem>
                                <MenuItem>
                                    <span className={style.item}>
                                        <NavLink to="/profile" activeClassName={style.activeLink}>Profile</NavLink>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span className={style.item}>
                                        <NavLink to="/forgot" activeClassName={style.activeLink}>Forgot</NavLink>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span className={style.item}>
                                        <NavLink to="/set_new_password/:token" activeClassName={style.activeLink}>Set
                                            a
                                            new
                                            password</NavLink>
                                    </span>
                                </MenuItem>
                                <MenuItem>
                                    <span className={style.item}>
                                        <NavLink to="/error404"
                                                 activeClassName={style.activeLink}>Error404</NavLink>
                                    </span>
                                </MenuItem>
                            </nav>
                        </Menu>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                        Project
                    </Typography>
                    {/*<nav className={style.nav}>*/}
                    {/*    <span className={style.item}>*/}
                    {/*        <NavLink to="/log_up" activeClassName={style.activeLink}>register</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className={style.item}>*/}
                    {/*        <NavLink to="/log_in" activeClassName={style.activeLink}>login</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className={style.item}>*/}
                    {/*        <NavLink to="/profile" activeClassName={style.activeLink}>profile</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className={style.item}>*/}
                    {/*        <NavLink to="/password_recovery" activeClassName={style.activeLink}>forgot</NavLink>*/}
                    {/*    </span>*/}
                    {/*    <span className={style.item}>*/}
                    {/*        <NavLink to="/enter_a_new_password" activeClassName={style.activeLink}>setPass</NavLink>*/}
                    {/*    </span>*/}
                    {/*</nav>*/}
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}