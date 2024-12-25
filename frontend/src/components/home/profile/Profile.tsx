import React, {useState} from 'react';
import {useSelector} from "react-redux";
import styles from './Profile.module.css';
import ProfileNotOk from "./ProfileNC/ProfileNotOk";
import ProfileOK from "./ProfileOK/ProfileOK";
import {useDispatch} from 'react-redux';
import {metaUpdate} from "../../../redux/profile/profileActions";

function Profile() {
    const userData = useSelector((state: any) => (state.profile.profile));
    const userStatus = useSelector((state: any) => (state.profile.meta.error));
    const [typeReq, setTypeReq] = useState('post');
    const [initialValues, setInitialValues] = useState({
        username: '',
        about: '',
        goal: '',
        program_language: '',
        vk: '',
        telegram: '',
        phone: '',
        email: '',
    });
    const dispatch = useDispatch();

    const changeProfileHandler = () => {
        setTypeReq('put');
        setInitialValues({
            username: userData.name,
            about: userData.about,
            goal: userData.goal,
            program_language: userData.program_language,
            vk: userData.contact.vk,
            telegram: userData.contact.telegram,
            phone: userData.contact.phone,
            email: userData.contact.email,
        });
        dispatch(metaUpdate(204));
    }
    return (
        <>
            <div className={styles.item}>STATUS: {userData.status}</div>
            <div className={styles.item}>VALID MESSAGE: {userData.no_valid} </div>
            {userStatus === 200 && <div>
                <ProfileOK/>
                <button className={styles.btn} onClick={changeProfileHandler}>Изменить профиль</button>
            </div>}
            {userStatus === 204 && <ProfileNotOk typeRequest={typeReq} initialValues={initialValues}/>}
        </>
    );
}

export default Profile;
