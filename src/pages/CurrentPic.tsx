import React from 'react';
import { useGetByDateQuery } from '@/store/api/picApi';
import styles from './home.module.scss'

function CurrentPic({current}: {current: string}) {
    const { data } = useGetByDateQuery(current);
    return (
        data ?
            <div className={styles.frame}>
                <div className={styles.current_left}>
                    {
                        data.media_type === 'video' ?
                            <div className={styles.current_vid}>
                                <iframe
                                    src={data.url}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    frameBorder="0"
                                    allowFullScreen>
                                </iframe>
                            </div>
                            :
                            <div className={styles.current_pic}>
                                <img className={styles.current_img} src={data.url} alt="Picture of the day" />
                            </div>
                    }
                    <div className={styles.current_info_wrapper}>
                        <h1>
                            {data.title}
                        </h1>
                        {
                            data.copyright &&
                            <span>
                                by {data.copyright}
                            </span>
                        }
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
            : <h1>Loading...</h1>
    );
}

export default CurrentPic;