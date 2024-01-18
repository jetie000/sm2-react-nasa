import React from "react";
import { useCallback, useMemo, useState } from 'react'
import styles from './home.module.scss'
import { useGetByDateQuery } from '@/store/api/picApi'
import { variables } from '@/variables'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

export default function Home() {
    const todayDate = useMemo(() => new Date(), [])

    const [current, setCurrent] = useState(variables.DateToString(todayDate))
    const [startDate, setStartDate] = useState(variables.DateToString(new Date(todayDate.setDate(todayDate.getDay() - variables.DAYS_OFFSET))))
    const [endDate, setEndDate] = useState(variables.DateToString(todayDate))

    // const { data, isLoading, isError } = useGetByDateQuery(current);


    const data =
    {
        "copyright": "\nDavid Payne\n",
        "date": "2023-12-26",
        "explanation": "Why is this jellyfish swimming in a sea of stars? Drifting near bright star Eta Geminorum, seen at the right, the Jellyfish Nebula extends its tentacles from the bright arcing ridge of emission left of center.  In fact, the cosmic jellyfish is part of bubble-shaped supernova remnant IC 443, the expanding debris cloud from a massive star that exploded.  Light from the explosion first reached planet Earth over 30,000 years ago.  Like its cousin in astronomical waters, the Crab Nebula supernova remnant IC 443 is known to harbor a neutron star -- the remnant of the collapsed stellar core.  The Jellyfish Nebula is about 5,000 light-years away.  At that distance, the featured image would span about 140 light-years across.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
        "hdurl": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_7846.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "IC 443: The Jellyfish Nebula",
        "url": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_960.jpg"
    }
    const isLoading = false


    return (
        <Provider store={store}>
            <main className={styles.main}>
                <section className={styles.current_wrapper}>
                    
                    <div className={styles.current}>
                        <div className={styles.current_left}>
                            <div className={styles.current_pic}>
                                {
                                    !isLoading && data ?
                                        <img className={styles.current_img} src={data.url} alt="Picture of the day" />
                                        : <h1>Загрузка...</h1>
                                }
                            </div>
                            <div className={styles.current_info_wrapper}>
                                <h1>
                                    {data.title}
                                </h1>
                                <span>by {data.copyright}</span>
                                <h3>{data.date}</h3>
                            </div>
                        </div>
                        <div className={styles.current_desc}>
                            <h1>Explanation</h1>
                            <h3>
                                {data.explanation}
                            </h3>
                        </div>
                    </div>
                </section>
            </main>
        </Provider>
    )
}
