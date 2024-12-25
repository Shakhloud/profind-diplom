import React, {useState} from 'react';
import styles from './Matches.module.css';
import {defaultService} from "../../../api/default/DefautlService";
import {useSelector} from "react-redux";
import {store} from "../../../redux/store";
import Finditem from "../find/findItem/Finditem";
import Prematchesitem from "./prematchesItem/Prematchesitem";
import {serverAPI, URL_CORE_HOST} from "../../../api/ServerAPI";
import {findService} from "../../../api/find/FindService";
import {prematchService} from "../../../api/prematch/PrematchService";
import Matchesitem from "./matchItem/Matchesitem";


function Matches() {
    const [prematch, setPrematch] = useState(false);
    const [match, setMatch] = useState(false);
    const userData = useSelector((state: any) => (state.profile.profile));
    const [prematchList, setPrematchList] = useState<any[]>(useSelector((state: any) => (state.prematch)));
    const [matchList, setMatchList] = useState<any[]>(useSelector((state: any) => (state.match)));
    setTimeout(() => {
        const storeState = store.getState();
        setPrematchList(storeState.prematch);
        setMatchList(storeState.match);
    }, 100);


    const isArrayEmpty = (arr: any[]) => {
        return arr.length === 0;
    }
    const prematchHandler = () => {
        defaultService.prematchInit();
        if (match) {
            setMatch(false);
        }
        setPrematch(!prematch);
    }

    const matchHandler = () => {
        defaultService.matchInit();
        if (prematch) {
            setPrematch(false);
        }
        setMatch(!match);
    }

    const prematchCompleteHandler = (wasLike: boolean) => {
        const storeState = store.getState();
        const currentUser = storeState.authLog.profileData.profile.username;
        if (!isArrayEmpty(prematchList)) {
            serverAPI.requestWrapper({
                requestType: {
                    type: 'POST',
                },
                url: `${URL_CORE_HOST}/prematch`,
                body: {
                    "targetUsername": currentUser,
                    "swaipUsername": prematchList[0].username,
                    "wasLike": wasLike,
                },
            }).then(data => {
                if (data.status === 200) {
                    defaultService.prematchInit();
                    defaultService.findInit();
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.btns_wrapper}>
                    <button className={styles.btn} onClick={matchHandler} type='button'>match</button>
                    <button className={styles.btn} onClick={prematchHandler} type='button'>pre-match</button>
                </div>
                {prematch && <div className={styles.prematch_wrapper}>
                    {!isArrayEmpty(prematchList) && (userData.status === 'VALID') && <div>
                        <Prematchesitem user={prematchList[0]}/>
                        <div className={styles.btns_wrapper}>
                            <button type="button" className={styles.btn} onClick={() => {
                                prematchCompleteHandler(true);
                                console.log('success');
                            }}>+
                            </button>
                            <button className={styles.btn} onClick={() => {
                                prematchCompleteHandler(false);
                                console.log('fail');
                            }} type="button">-
                            </button>
                        </div>
                    </div>}
                    {isArrayEmpty(prematchList) && userData.status === 'VALID' &&
                        <div className={styles.notFound}>Подходящих пользователей не найдено.</div>}
                </div>}
                {match && <div className={styles.prematch_wrapper}>
                    {!isArrayEmpty(matchList) && (userData.status === 'VALID') && <div className={styles.match_wrapper}>
                        {matchList.map((el => {
                            return <div key={el.profile.username}>
                                <Matchesitem userInfo={el.profile} userMatch={el.match}/>
                            </div>
                        }))}
                    </div>}
                    {isArrayEmpty(matchList) && userData.status === 'VALID' &&
                        <div className={styles.notFound}>Подходящих пользователей не найдено.</div>}
                </div>}
            </div>
        </>
    );
}

export default Matches;
