import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Moditem from "./modItem/Moditem";
import {Field, Form, Formik} from "formik";
import {validation_moderation, validation_profile} from "../../../validation/validation";
import styles from "./Moderation.module.css"
import {serverAPI, URL_TOKEN_MODERATION_PUT, URL_TOKEN_PROFILE} from "../../../api/ServerAPI";
import {formService} from "../../../api/form/FormService";
import {store} from "../../../redux/store";
import {defaultService} from "../../../api/default/DefautlService";

function Moderation() {

    const [usersList, setUsersList] = useState(useSelector((state: any) => (state.moderation)));
    setTimeout(() => {
        const storeState = store.getState();
        setUsersList(storeState.moderation);
    }, 100);
    const [currentId, setCurrentId] = useState(0);

    function isArrayEmpty(arr: []) {
        return arr.length === 0;
    }

    const validateHandler = (status: string, msg: string): void => {
        if (!isArrayEmpty(usersList)) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'PUT',
                },
                url: `${URL_TOKEN_MODERATION_PUT}${usersList[0].username}`,
                body: {
                    status: status,
                    name: usersList[0].name,
                    about: usersList[0].about,
                    goal: usersList[0].goal,
                    program_language: usersList[0].program_language,
                    no_valid: msg,
                    contact: {
                        vk: usersList[0].contact.vk,
                        telegram: usersList[0].contact.telegram,
                        phone: usersList[0].contact.phone,
                        email: usersList[0].contact.email,
                    }
                },
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const modHandler = () => {
        defaultService.moderationInit();
        setTimeout(() => {
            defaultService.profileInit();
            defaultService.findInit()
        }, 100);

    }

    return (
        <>
            {!isArrayEmpty(usersList) && <div>
                <Moditem user={usersList[currentId]}/>
                <Formik
                    validationSchema={validation_moderation}
                    initialValues={{
                        error_msg: '',
                    }}
                    onSubmit={values => {
                        validateHandler('NO_VALID', values.error_msg);
                        modHandler();
                    }}
                >
                    {({errors, touched}) => (
                        <Form>
                            <label className={styles.itemLabel}>Текст ошибки:</label>
                            <Field as="textarea" name="error_msg" className={styles.textarea}/>
                            {errors.error_msg && touched.error_msg && (
                                <div className={styles.formError}>
                                    {errors.error_msg}
                                </div>
                            )}
                            <div className={styles.btnsWrapper}>
                                <button type="button" className={styles.btn} onClick={() => {
                                    validateHandler('VALID', 'Анкета прошла валидацию. Удачного пользования.');
                                    modHandler();
                                }}>VALID
                                </button>
                                <button className={styles.btn} type="submit">NO_VALID</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>}
            {isArrayEmpty(usersList) && <div className={styles.notFound}>Анкет на проверку не найдено.</div>}
        </>
    );
}

export default Moderation;
