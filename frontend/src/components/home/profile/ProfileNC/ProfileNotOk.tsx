import styles from './ProfileNotOk.module.css';
import React from "react";
import {Field, Form, Formik} from "formik";
import {validation_profile} from "../../../../validation/validation";
import {serverAPI, URL_TOKEN_PROFILE} from "../../../../api/ServerAPI";
import {formService} from "../../../../api/form/FormService";

function ProfileNotOk(props: any) {

    return <>
        <div className={styles.main}>
            <Formik
                validationSchema={validation_profile}
                initialValues={{
                    username: `${props.initialValues.username}`,
                    about: `${props.initialValues.about}`,
                    goal: `${props.initialValues.goal}`,
                    program_language: `${props.initialValues.program_language}`,
                    vk: `${props.initialValues.vk}`,
                    telegram: `${props.initialValues.telegram}`,
                    phone: `${props.initialValues.phone}`,
                    email: `${props.initialValues.email}`,
                }}
                onSubmit={values => {
                    if (props.typeRequest === 'post') {
                        serverAPI.requestWrapper({
                            requestType: {
                                type: 'POST',
                            },
                            url: URL_TOKEN_PROFILE,
                            body: {
                                status: 'NEW',
                                name: values.username,
                                about: values.about,
                                goal: values.goal,
                                program_language: values.program_language,
                                no_valid: 'Ваш профиль ещё не проверен модератором',
                                contact: {
                                    vk: values.vk,
                                    telegram: values.telegram,
                                    phone: values.phone,
                                    email: values.email,
                                }
                            },
                        }).then(data => {
                            formService.updateData({
                                status: 'NEW',
                                name: values.username,
                                about: values.about,
                                goal: values.goal,
                                program_language: values.program_language,
                                no_valid: 'Ваш профиль ещё не проверен модератором',
                                contact: {
                                    vk: values.vk,
                                    telegram: values.telegram,
                                    phone: values.phone,
                                    email: values.email,
                                }
                            })
                            formService.updateMeta(data.status);
                        }).catch(error => {
                            formService.updateMeta(error.status);
                        })
                    } else {
                        serverAPI.requestWrapper({
                            requestType: {
                                type: 'PUT',
                            },
                            url: URL_TOKEN_PROFILE,
                            body: {
                                status: 'NEW',
                                name: values.username,
                                about: values.about,
                                goal: values.goal,
                                program_language: values.program_language,
                                no_valid: 'Ваш профиль ещё не проверен модератором',
                                contact: {
                                    vk: values.vk,
                                    telegram: values.telegram,
                                    phone: values.phone,
                                    email: values.email,
                                }
                            },
                        }).then(data => {
                            formService.updateData({
                                status: 'NEW',
                                name: values.username,
                                about: values.about,
                                goal: values.goal,
                                program_language: values.program_language,
                                no_valid: 'Ваш профиль ещё не проверен модератором',
                                contact: {
                                    vk: values.vk,
                                    telegram: values.telegram,
                                    phone: values.phone,
                                    email: values.email,
                                }
                            })
                            formService.updateMeta(data.status);
                        }).catch(error => {
                            formService.updateMeta(error.status);
                        })
                    }
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <div className={styles.wrapper}>
                            <div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        NAME:
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
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        ABOUT:
                                    </label>
                                    <Field
                                        className={styles.formField}
                                        name="about"
                                    />
                                    {errors.about && touched.about && (
                                        <div className={styles.formError}>
                                            {errors.about}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        GOAL
                                    </label>
                                    <Field as="select" name="goal" className={styles.formField}>
                                        <option value=''>Цель</option>
                                        <option value="STUDENT">STUDENT</option>
                                        <option value="TEACHER">TEACHER</option>
                                        <option value="STARTUP_PLAYER">STARTUP_PLAYER</option>
                                        <option value="STARTUP_BOSS">STARTUP_BOSS</option>
                                        <option value="INVESTOR">INVESTOR</option>
                                    </Field>
                                    {errors.goal && touched.goal && (
                                        <div className={styles.formError}>
                                            {errors.goal}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        PROGRAM_LANGUAGE
                                    </label>
                                    <Field as="select" name="program_language" className={styles.formField}>
                                        <option value=''>Язык программирования</option>
                                        <option value="JAVA">JAVA</option>
                                        <option value="JS">JS</option>
                                        <option value="PYTHON">PYTHON</option>
                                    </Field>
                                    {errors.program_language && touched.program_language && (
                                        <div className={styles.formError}>
                                            {errors.program_language}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className={styles.titleForm}>
                                    Contacts:
                                </label>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        vk*:
                                    </label>
                                    <Field
                                        className={styles.formField}
                                        name="vk"
                                    />
                                    {errors.vk && touched.vk && (
                                        <div className={styles.formError}>
                                            {errors.vk}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        telegram:
                                    </label>
                                    <Field
                                        className={styles.formField}
                                        name="telegram"
                                    />
                                    {errors.telegram && touched.telegram && (
                                        <div className={styles.formError}>
                                            {errors.telegram}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        phone*:
                                    </label>
                                    <Field
                                        className={styles.formField}
                                        name="phone"
                                        type="number"
                                    />
                                    {errors.phone && touched.phone && (
                                        <div className={styles.formError}>
                                            {errors.phone}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.item}>
                                    <label className={styles.formLabel}>
                                        email:
                                    </label>
                                    <Field
                                        className={styles.formField}
                                        name="email"
                                        type="email"
                                    />
                                    {errors.email && touched.email && (
                                        <div className={styles.formError}>
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.msg}>
                            * - необязательно для заполнения
                        </div>
                        <button
                            className={styles.btn}
                            type="submit"
                        >
                            Отправить данные
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    </>
}

export default ProfileNotOk;
