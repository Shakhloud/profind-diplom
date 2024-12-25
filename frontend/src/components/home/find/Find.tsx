import styles from "./Find.module.css"
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {store} from "../../../redux/store";
import Finditem from "./findItem/Finditem";
import {serverAPI, URL_CORE_HOST} from "../../../api/ServerAPI";
import {findService} from "../../../api/find/FindService";
import {useNavigate} from "react-router-dom";
import {defaultService} from "../../../api/default/DefautlService";

function Find() {
    const userData = useSelector((state: any) => (state.profile.profile));
    const [usersList, setUsersList] = useState<any[]>(useSelector((state: any) => (state.find)));
    const navigate = useNavigate();

    setTimeout(() => {
        const storeState = store.getState();
        setUsersList(storeState.find);
    }, 50);

    function isArrayEmpty(arr: any[]) {
        return arr.length === 0;
    }

    const prematchHandler = (wasLike: boolean) => {
        const storeState = store.getState();
        const currentUser = storeState.authLog.profileData.profile.username;
        if (!isArrayEmpty(usersList)) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'POST',
                },
                url: `${URL_CORE_HOST}/prematch`,
                body: {
                    "targetUsername":currentUser,
                    "swaipUsername":  usersList[0].username,
                    "wasLike": wasLike,
                },
            }).then(data => {
                if (data.status === 200) {
                    defaultService.findInit();
                    defaultService.prematchInit();
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const navProfile = () => {
        navigate('/home/profile');
    }

    return (
        <>
            <>
                {!isArrayEmpty(usersList) && (userData.status === 'VALID') && <div>
                    <Finditem user={usersList[0]}/>
                    <div className={styles.btnsWrapper}>
                        <button type="button" className={styles.btn} onClick={() => {
                            prematchHandler(true);
                            console.log(usersList);
                        }}>+
                        </button>
                        <button className={styles.btn} onClick={() => {
                            prematchHandler(false);
                            console.log('fail');
                        }} type="button">-
                        </button>
                    </div>
                </div>}
                {isArrayEmpty(usersList) && userData.status === 'VALID' &&
                    <div className={styles.notFound}>Подходящих пользователей не найдено.</div>}
                {(userData.status === 'NEW' || userData.status === 'NO_VALID') &&
                    <div className={styles.notFound1}>Ваша анкета не заполнена. Перейдите в <a onClick={navProfile}
                                                                                               className={styles.profile_span}>profile</a>,
                        чтобы посмотреть ваш статус, либо создать анкету.</div>}
            </>
        </>
    );
}

export default Find;
