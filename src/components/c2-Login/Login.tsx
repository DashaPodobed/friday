import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
    Grid
} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from 'react-router-dom';
import {LoginTC} from "../../reducers/r2-LoginReducer";
import {Preloader} from "../c8-Preloader/Preloader";
import {ErrorSnackbar} from "../с6-Error/ErrorSnackbar";
import {DisabledButton} from "../../common/c4-DisabledButton/DisabledButton";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LogIn = React.memo(function () {
    console.log("login")
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(LoginTC(values))
            formik.resetForm()
        },
    })

    if (isInitialized) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <Preloader/>
        <ErrorSnackbar/>
        <Grid container justify="center">
            <Grid item xs={4}>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                {...formik.getFieldProps('rememberMe')}
                            />
                            <DisabledButton title={"Login"} variant={'contained'}/>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    </div>
})

//https://www.youtube.com/watch?v=6VmVYi9yrAA


