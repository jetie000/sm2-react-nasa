import React, { useRef } from "react";
import { useCallback, useMemo, useState } from 'react'
import styles from './home.module.scss'
import { variables } from '@/variables'
import PicsList from "./PicsList";
import CurrentPic from "./CurrentPic";

export default function Home() {
    const todayDate = useMemo(() => new Date(), [])

    const [current, setCurrent] = useState(variables.DateToString(todayDate))

    return (
        <main className={styles.main}>
            <section className={styles.wrapper}>
                <CurrentPic current={current}/>
            </section>
            <section className={styles.wrapper}>
                <PicsList current={current} setCurrent={setCurrent} todayDate={todayDate}/>
            </section>
        </main>
    )
}
