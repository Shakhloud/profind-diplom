import React from 'react';
import styles from './Reg.module.css';
import {Formik, Form, Field} from 'formik';
import {useNavigate} from "react-router-dom";
import {validation_reg} from "../../../validation/validation";
import {useDispatch, useSelector} from "react-redux";
import * as auth from '../../../redux/auth/authActions';
import {authService} from "../../../api/auth/AuthService";


function Reg() {
    const navigate = useNavigate();

    const isAuth = useSelector((state: any) => state.authLog.authData.isAuth);

    const backHandler = () => {
        navigate('/');
        dispatch(auth.changeRegMessage(''));
    }

    const gotoLogin = () => {
        navigate('/login');
        dispatch(auth.changeRegMessage(''));
    }

    const dispatch = useDispatch();

    const message = useSelector((state: any) => state.authReg.message);

    if (message === 'Регистрация прошла успешно.') {
        setTimeout(gotoLogin, 1500);
    }

    if (isAuth) {
        navigate('/home');
    }

    return (
        <>
            <div className={styles.bg} onClick={backHandler}></div>
            <div className={styles.login}>
                <Formik
                    validationSchema={validation_reg}
                    initialValues={{
                        username: '',
                        password: '',
                    }}

                    onSubmit={values => {

                        dispatch(auth.registration({
                            username: values.username,
                            password: values.password,
                        }))

                        authService.register();

                    }}
                >
                    {({errors, touched}) => (
                        <Form className={styles.form}>
                            <label className={styles.title}>
                                Регистрация
                            </label>
                            <label className={styles.formLabel}>
                                Логин:
                            </label>
                            <Field
                                className={styles.formField}
                                name="username"
                            />
                            {errors.username && touched.username && (
                                <div className={styles.formError}>
                                    {errors.username}
                                </div>
                            )}

                            <label className={styles.formLabel}>
                                Пароль:
                            </label>

                            <Field
                                className={styles.formField}
                                name="password"
                                type="password"
                            />

                            {errors.password && touched.password && (
                                <div className={styles.formError}>
                                    {errors.password}
                                </div>
                            )}

                            <div className={styles.regError}>
                                {message}
                            </div>

                            <button
                                className={styles.btn}
                                type="submit"
                            >
                                Зарегистрироваться
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default Reg;
