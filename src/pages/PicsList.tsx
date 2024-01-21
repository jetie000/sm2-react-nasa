
import React, { useCallback, useMemo, useRef, useState } from 'react';
import styles from './home.module.scss'
import { variables } from '@/variables';
import { useGetByRangeQuery } from '@/store/api/picApi';

interface PicsListProps{
    current: string,
    setCurrent: Function,
    todayDate: Date
}

function PicsList({
    current,
    setCurrent,
    todayDate
}: PicsListProps) {
    
    const curRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)
    
    const [startDate, setStartDate] = useState(variables.DateToString(new Date(new Date().setDate(todayDate.getDate() - variables.DAYS_OFFSET + 1))))
    const [endDate, setEndDate] = useState(variables.DateToString(todayDate))
    const [page, setPage] = useState(1)
    
    const { data: dataRange, isError: isErrorRange, isFetching: isFetchingRange } = useGetByRangeQuery({ start: startDate, end: endDate });

    const pagePics = useMemo(() => dataRange?.slice().reverse().slice((page - 1) * variables.PICS_PER_PAGE, (page - 1) * variables.PICS_PER_PAGE + 20), [page, dataRange])

    const setPicsListHandler = useCallback(() => {
        if (startRef.current && endRef.current) {
            let startDateToChange = new Date(startRef.current.value)
            let endDateToChange = new Date(endRef.current.value)
            if (startDateToChange < endDateToChange && todayDate > endDateToChange) {
                setStartDate(variables.DateToString(startDateToChange))
                setEndDate(variables.DateToString(endDateToChange))
            }
            else {
                startRef.current.value = startDate
                endRef.current.value = endDate
            }
        }
    }, [])

    const setCurrentPicHandler = useCallback(() => {
        if (curRef.current) {
            let currDateToChange = new Date(curRef.current.value)
            if (currDateToChange < todayDate)
                setCurrent(variables.DateToString(currDateToChange))
            else
                curRef.current.value = current
        }
    }, [])

    return ( 
        <div className={styles.frame} id={styles.pics}>
            <div className={styles.panel}>
                <div className={styles.panel_wrapper}>
                    <div className={styles.panel_input}>
                        <h4>Pick date</h4>
                        <input type="date" id="currentDate" defaultValue={current} ref={curRef} />
                    </div>
                    <button className={styles.button_sm}
                        onClick={setCurrentPicHandler}>
                        Show picture
                    </button>
                </div>

                <div className={styles.panel_wrapper}>
                    <div className={styles.panel_input}>
                        <h4>Pick start date</h4>
                        <input type="date" id="startDate" defaultValue={startDate} ref={startRef} />
                    </div>
                    <div className={styles.panel_input}>
                        <h4>Pick end date</h4>
                        <input type="date" id="endDate" defaultValue={endDate} ref={endRef} />
                    </div>
                    <button className={styles.button_sm}
                        onClick={setPicsListHandler}>
                        Show pictures list
                    </button>
                </div>

                <div className={styles.panel_wrapper + ' ' + styles.pagination}>
                    <button className={styles.button_round}
                        disabled={page === 1}
                        onClick={() => setPage((page) => page - 1)}>
                        {'<'}
                    </button>
                    <div className={styles.page}>
                        {page}
                    </div>
                    <button className={styles.button_round}
                        disabled={page === Math.ceil((dataRange?.length || variables.PICS_PER_PAGE) / variables.PICS_PER_PAGE)}
                        onClick={() => setPage((page) => page + 1)}>
                        {'>'}
                    </button>
                </div>

            </div>
            {
                !isFetchingRange && pagePics ? pagePics.map(pic =>
                    <div className={styles.pic} key={pic.date} onClick={() => setCurrent(pic.date)}>
                        <h4>
                            Date: {pic.date}
                        </h4>
                        <div>
                            {pic.title}
                        </div>
                        {pic.copyright &&
                            <div className={styles.pic_copyright}>
                                <i>by {pic.copyright}</i>
                            </div>
                        }
                    </div>)
                    : <h1 className={styles.pic}>Loading...</h1>
            }
        </div> );
}

export default PicsList;