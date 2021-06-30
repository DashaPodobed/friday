import * as React from 'react'
import {useFormik,} from "formik";
import {loginTC} from "../../reducers/r1-LogupReducer";
import {useDispatch} from "react-redux";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'

export const LogUp = () => {
    const dispatch = useDispatch();

    type FormikErrorType = {
        email?: string
        password?: string
        confirmPassword?: string
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password || values.password.length < 8) {
                errors.password = 'Enter valid password'
            }
            if (!values.confirmPassword || values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Enter valid password'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    // const validation = Yup.object({
    //     login: Yup.string()
    //         .required('Required'),
    //     password: Yup.string()
    //         .required('Required'),
    //     confirmPassword: Yup.string()
    //         .oneOf([Yup.ref('password'), ''], 'Password must match')
    //         .required('Required'),
    // })


    return <Grid container justify="center">
        <Grid item xs={4}>
    <form onSubmit={formik.handleSubmit}>
        <FormControl>
            <FormGroup>
            <div>
                <TextField
                    placeholder={"Email"}
                    {...formik.getFieldProps('email')}
                    style={{margin: ' 100px 0px 30px 0px'}}
                />
            </div>
            {formik.touched.email && formik.errors.email ?
                <div>{formik.errors.email}</div> : null}
            <div>
                <TextField
                    type="password"
                    placeholder={"Password"}
                    {...formik.getFieldProps('password')}
                    style={{marginBottom: ' 30px'}}/>
            </div>
            {formik.errors.password ?
                <div>{formik.errors.password}</div> : null}
            <div>
                <TextField
                    type="password"
                    placeholder={"Confirm password"}
                    {...formik.getFieldProps('confirmPassword')}
                    style={{marginBottom: ' 30px'}}/>
            </div>
            {formik.errors.confirmPassword ?
                <div>{formik.errors.confirmPassword}</div> : null}
            <div>
                <Button type={'submit'} variant={'contained'} color={'primary'}>Register</Button>
            </div>
            </FormGroup>
        </FormControl>
        </form>
        </Grid>
    </Grid>
}