import React, {useEffect, useState} from 'react';
import styles from './Login.module.css';
import {Formik, Form, Field} from 'formik';
import {useNavigate} from "react-router-dom";
import {validation_log} from "../../../validation/validation";
import {authService} from "../../../api/auth/AuthService";
import {useDispatch, useSelector} from "react-redux";
import * as auth from "../../../redux/auth/authActions";
import {serverAPI, URL_TOKEN_PROFILE} from "../../../api/ServerAPI";
import {formService} from "../../../api/form/FormService";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector((state: any) => state.authLog.authData.error);
    const isAuth = useSelector((state: any) => state.authLog.authData.isAuth);

    const backHandler = () => {
        navigate('/');
        dispatch(auth.loginFailure(''));
    }

    useEffect(() => {
        if (isAuth) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'GET',
                },
                url: URL_TOKEN_PROFILE,
                body: null,
            }).then(data => {
                if (data.status === 200) {
                    formService.updateData(data.data);
                    formService.updateMeta(data.status);
                }
                if (data.status === 204) {
                    formService.updateMeta(data.status);
                }
                navigate('/home')
            }).catch(error => {
                console.log(error);
            })
        }
    }, [isAuth, navigate]);

    return (
        <>
            <div className={styles.bg} onClick={backHandler}></div>
            <div className={styles.login}>
                <Formik
                    validationSchema={validation_log}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={values => {
                        authService.login(values.username, values.password);
                    }}
                >
                    {({errors, touched}) => (
                        <Form className={styles.form}>
                            <label className={styles.title}>
                                Вход
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
                            <div className={styles.logError}>
                                {error}
                            </div>
                            <button
                                className={styles.btn}
                                type="submit"
                            >
                                Войти
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default Login;
