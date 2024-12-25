import styles from "./Prematchesitem.module.css"
import React from "react";
function Prematchesitem(props:any) {
    return (
        <>
            <div className={styles.main}>
                <div>
                    <div className={styles.title}>Анкета пользователя: {props.user.username}</div>
                    <div className={styles.item}>
                        <p>NAME: {props.user.name}</p>
                    </div>
                    <div className={styles.item}>
                        <p>ABOUT: {props.user.about}</p>
                    </div>
                    <div className={styles.item}>
                        <p>GOAL: {props.user.goal}</p>
                    </div>
                    <div className={styles.item}>
                        <p>PROGRAM LANGUAGE: {props.user.program_language}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Prematchesitem;
