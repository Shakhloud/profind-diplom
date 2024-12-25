import styles from "./Moditem.module.css"
import React from "react";
function Moditem(props:any) {
    return (
        <>
            <div className={styles.main}>
                <div >
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
                <div className={styles.itemWrapper}>
                    <label className={styles.itemLabel}>Contacts:</label>
                    <div className={styles.item}>
                        <p>vk: {props.user.contact.vk}</p>
                    </div>
                    <div className={styles.item}>
                        <p>telegram: {props.user.contact.telegram}</p>
                    </div>
                    <div className={styles.item}>
                        <p>phone: {props.user.contact.phone}</p>
                    </div>
                    <div className={styles.item}>
                        <p>email: {props.user.contact.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Moditem;
