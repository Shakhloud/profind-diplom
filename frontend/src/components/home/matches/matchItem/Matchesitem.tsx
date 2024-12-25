import styles from "./Matchesitem.module.css"
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {store} from "../../../../redux/store";
import {serverAPI, URL_CORE_HOST} from "../../../../api/ServerAPI";
import {findService} from "../../../../api/find/FindService";
import {defaultService} from "../../../../api/default/DefautlService";

function Matchesitem(props: any) {
    const [check, setCheck] = useState(false);
    const authData = useSelector((state: any) => (state.authLog.profileData.profile));

    /*if (props.userMatch?.firstUsername == authData.username) {
        (props.userMatch.paymentFirst === false) ? setIsPayment(false) : setIsPayment(true);
    } else {
        (props.userMatch.paymentSecond === false) ? setIsPayment(false) : setIsPayment(true);
    }*/
    const checkHandler = () => {
        setCheck(!check);
    }

    const paymentHandler = () => {
        if (props.userMatch.firstUsername == authData.username) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'PUT',
                },
                url: `${URL_CORE_HOST}/match`,
                body: {
                    firstUsername: props.userMatch.firstUsername,
                    paymentFirst: true,
                    secondUsername: props.userMatch.secondUsername,
                    paymentSecond: props.userMatch.paymentSecond,
                },
            }).then(data => {
                if (data.status === 200) {
                    defaultService.matchInit();
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'PUT',
                },
                url: `${URL_CORE_HOST}/match`,
                body: {
                    firstUsername: props.userMatch.firstUsername,
                    paymentFirst: props.userMatch.paymentFirst,
                    secondUsername: props.userMatch.secondUsername,
                    paymentSecond: true,
                },
            }).then(data => {
                if (data.status === 200) {
                    defaultService.matchInit();
                }
            }).catch(error => {
                console.log(error);
            })
        }

    }

    return (
        <>
            <div className={styles.main}>
                {!check && <div className={styles.wrapper}>
                    <div className={styles.shortInfo}>
                        {props.userInfo.username}
                    </div>
                    {(props.userMatch.firstUsername == authData.username) && (!props.userMatch.paymentFirst) &&
                        <button onClick={paymentHandler} className={styles.btn}>open contacts</button>}
                    {(props.userMatch.secondUsername == authData.username) && (!props.userMatch.paymentSecond) &&
                        <button onClick={paymentHandler} className={styles.btn}>open contacts</button>}
                    {(props.userMatch.secondUsername == authData.username) && (props.userMatch.paymentSecond) &&
                        <button onClick={checkHandler} className={styles.btn}>check contacts</button>}
                    {(props.userMatch.firstUsername == authData.username) && (props.userMatch.paymentFirst) &&
                        <button onClick={checkHandler} className={styles.btn}>check contacts</button>}
                </div>}
                {check && <div>
                    <div>
                        <div className={styles.item}>
                            <p>NAME: {props.userInfo.name}</p>
                        </div>
                        <div className={styles.item}>
                            <p>ABOUT: {props.userInfo.about}</p>
                        </div>
                        <div className={styles.item}>
                            <p>GOAL: {props.userInfo.goal}</p>
                        </div>
                        <div className={styles.item}>
                            <p>PROGRAM LANGUAGE: {props.userInfo.program_language}</p>
                        </div>
                    </div>
                    <div className={styles.itemWrapper}>
                        <label className={styles.itemLabel}>Contacts:</label>
                        <div className={styles.item}>
                            {(props.userInfo.contact.vk !== null) && (props.userInfo.contact.vk !== '') &&
                                <p>vk: {props.userInfo.contact.vk}</p>}
                        </div>
                        <div className={styles.item}>
                            <p>telegram: {props.userInfo.contact.telegram}</p>
                        </div>
                        <div className={styles.item}>
                            {(props.userInfo.contact.phone !== null) && (props.userInfo.contact.phone !== '') &&
                                <p>phone: {props.userInfo.contact.phone}</p>}
                        </div>
                        <div className={styles.item}>
                            <p>email: {props.userInfo.contact.email}</p>
                        </div>
                    </div>
                    <button onClick={checkHandler} className={styles.btn}>Hide</button>
                </div>}
            </div>
        </>
    );
}

export default Matchesitem;
