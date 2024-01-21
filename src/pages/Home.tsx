import React, { useRef } from "react";
import { useCallback, useMemo, useState } from 'react'
import styles from './home.module.scss'
import { useGetByDateQuery, useGetByRangeQuery } from '@/store/api/picApi'
import { variables } from '@/variables'

// const data =
// {
//     "copyright": "\nDavid Payne\n",
//     "date": "2023-12-26",
//     "explanation": "Why is this jellyfish swimming in a sea of stars? Drifting near bright star Eta Geminorum, seen at the right, the Jellyfish Nebula extends its tentacles from the bright arcing ridge of emission left of center.  In fact, the cosmic jellyfish is part of bubble-shaped supernova remnant IC 443, the expanding debris cloud from a massive star that exploded.  Light from the explosion first reached planet Earth over 30,000 years ago.  Like its cousin in astronomical waters, the Crab Nebula supernova remnant IC 443 is known to harbor a neutron star -- the remnant of the collapsed stellar core.  The Jellyfish Nebula is about 5,000 light-years away.  At that distance, the featured image would span about 140 light-years across.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
//     "hdurl": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_7846.jpg",
//     "media_type": "image",
//     "service_version": "v1",
//     "title": "IC 443: The Jellyfish Nebula",
//     "url": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_960.jpg"
// }
// const isLoading = false

// const isLoadingRange = false
// const dataRange = [
//     {
//         "date": "2023-12-16",
//         "explanation": "Peering from the shadows, the Saturn-facing hemisphere of tantalizing inner moon Enceladus poses in this Cassini spacecraft image. North is up in the dramatic scene captured during November 2016 as Cassini's camera was pointed in a nearly sunward direction about 130,000 kilometers from the moon's bright crescent. In fact, the distant world reflects over 90 percent of the sunlight it receives, giving its surface about the same reflectivity as fresh snow. A mere 500 kilometers in diameter, Enceladus is a surprisingly active moon. Data and images collected during Cassini's flybys have revealed water vapor and ice grains spewing from south polar geysers and evidence of an ocean of liquid water hidden beneath the moon's icy crust.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/PIA20522enceladus.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "Crescent Enceladus",
//         "url": "https://apod.nasa.gov/apod/image/2312/PIA20522enceladusC.jpg"
//     },
//     {
//         "copyright": "\nHongyang Luo\n",
//         "date": "2023-12-17",
//         "explanation": "Where are all of these meteors coming from?  In terms of direction on the sky, the pointed answer is the constellation of Gemini.  That is why the major meteor shower in December is known as the Geminids -- because shower meteors all appear to come from a radiant toward Gemini. Three dimensionally, however, sand-sized debris expelled from the unusual asteroid 3200 Phaethon follows a well-defined orbit about our Sun, and the part of the orbit that approaches Earth is superposed in front of the constellation of Gemini. Therefore, when Earth crosses this orbit, the radiant point of falling debris appears in Gemini. Featured here is a composite of many images taken a few days ago through dark skies from Nianhu Lake in China. Over 100 bright meteor streaks from the Geminids meteor shower are visible.    APOD Year in Review (2023): RJN's Night Sky Network Lecture",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/Geminids_Hongyang_3840.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "Geminids over China's Nianhu Lake",
//         "url": "https://apod.nasa.gov/apod/image/2312/Geminids_Hongyang_1080.jpg"
//     },
//     {
//         "date": "2023-12-18",
//         "explanation": "Are squares A and B the same color? They are! To verify this, either run your cursor over the image or click here to see them connected.  The featured illusion, an example of the same color illusion, illustrates that purely human perceptions in science may be ambiguous or inaccurate, even such a seemingly direct perception as relative color.  Similar illusions exist on the sky, such as the size of the Moon near the horizon, or the apparent shapes of astronomical objects.  The advent of automated, reproducible measuring devices such as CCDs have made science in general and astronomy in particular less prone to, but not free of, human-biased illusions.    APOD Year in Review (2023): RJN's Night Sky Network Lecture",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/greyillusion_wikipedia_960.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "The Same Color Illusion",
//         "url": "https://apod.nasa.gov/apod/image/2312/greyillusion_wikipedia_960.jpg"
//     },
//     {
//         "copyright": "\nSteven Powell\n",
//         "date": "2023-12-19",
//         "explanation": "Could Queen Calafia's mythical island exist in space? Perhaps not, but by chance the outline of this molecular space cloud echoes the outline of the state of California, USA. Our Sun has its home within the Milky Way's Orion Arm, only about 1,000 light-years from the California Nebula. Also known as NGC 1499, the classic emission nebula is around 100 light-years long. On the featured image, the most prominent glow of the California Nebula is the red light characteristic of hydrogen atoms recombining with long lost electrons, stripped away (ionized) by energetic starlight. The star most likely providing the energetic starlight that ionizes much of the nebular gas is the bright, hot, bluish Xi Persei just to the right of the nebula.  A regular target for astrophotographers, the California Nebula can be spotted with a wide-field telescope under a dark sky toward the constellation of Perseus, not far from the Pleiades.   Explore Your Universe: Random APOD Generator",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/CalNeb_Powell_3923.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "NGC 1499: The California Nebula",
//         "url": "https://apod.nasa.gov/apod/image/2312/CalNeb_Powell_960.jpg"
//     },
//     {
//         "copyright": "\nBastian Werner\n",
//         "date": "2023-12-20",
//         "explanation": "What's causing those unusual sky arcs? Ice crystals.  While crossing a field of fresh snow near Füssen, Bavaria, Germany, earlier this month, the photographer noticed that he had entered an ice fog.  For suspended water to freeze into an ice fog requires quite cold temperatures, and indeed the air temperature on this day was measured at well below zero.  The ice fog reflected light from the Sun setting behind St. Coleman Church.  The result was one of the greatest spectacles the photographer has ever seen. First, the spots in the featured picture are not background stars but suspended ice and snow. Next, two prominent ice halos are visible: the 22-degree halo and the 46-degree halo. Multiple arcs are also visible, including, from top to bottom, antisolar (subsun), circumzenithal, Parry, tangent, and parhelic (horizontal). Finally, the balloon shaped curve connecting the top arc to the Sun is the rarest of all: it is the heliac arc, created by reflection from the sides of hexagonally shaped ice crystals suspended in a horizontal orientation.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/BavarianHalos_Werner_1500.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "Ice Halos over Bavaria",
//         "url": "https://apod.nasa.gov/apod/image/2312/BavarianHalos_Werner_960.jpg"
//     },
//     {
//         "copyright": "Dan Bartlett",
//         "date": "2023-12-21",
//         "explanation": "Distant galaxies abound in this one degree wide field of view toward the southern constellation Grus (The Crane). But the three spiral galaxies at the lower right are quite striking. In fact, all three galaxies are grouped about 70 million light years away and sometimes known as the Grus Triplet. They share the pretty telescopic frame, recorded on December 13, with the comet designated C/2020 V2 ZTF. Now outbound from the inner Solar System and swinging below the ecliptic plane in a hyperbolic orbit, the comet was about 29 light-minutes from our fair planet in this image. And though this comet ZTF was brighter when it was closest to the Sun last May and closest to Earth in September of 2023, it still shines in telescopes pointed toward southern night skies, remaining almost as bright as the Grus Triplet galaxies.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/C2020_V2_ZTF_CHILESCOPE_DEBartlett1024.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "Three Galaxies and a Comet",
//         "url": "https://apod.nasa.gov/apod/image/2312/C2020_V2_ZTF_CHILESCOPE_DEBartlett1024.jpg"
//     },
//     {
//         "copyright": "solargraph",
//         "date": "2023-12-22",
//         "explanation": "A single 183 day exposure with a pinhole camera and photographic paper resulted in this long-duration solargraph. Recorded from solstice to solstice, June 21 to December 21, in 2022, it follows the Sun's daily arcing path through planet Earth's skies from Mertola, Portugal. On June 21, the Sun's highest point and longest arc represents the longest day and the astronomical beginning of summer in the northern hemisphere. The solstice date with the fewest hours of daylight is at the beginning of winter in the north, corresponding to the Sun's shortest and lowest arc in the 2022 solargraph. For 2023, the northern winter solstice was on December 22 at 3:27 UTC. That's December 21 for North America time zones.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/solsticesolargraphy.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "183 Days in the Sun",
//         "url": "https://apod.nasa.gov/apod/image/2312/solsticesolargraphy1024.jpg"
//     },
//     {
//         "copyright": "Ian Griffin",
//         "date": "2023-12-23",
//         "explanation": "Colours of a serene evening sky are captured in this 8 minute exposure, made near this December's solstice from New Zealand, southern hemisphere, planet Earth. Looking south, star trails form the short concentric arcs around the rotating planet's south celestial pole positioned just off the top of the frame. At top and left of center are trails of the Southern Cross stars and a dark smudge from the Milky Way's Coalsack Nebula. Alpha and Beta Centauri make the brighter yellow and blue tinted trails, reflected below in the waters of Hoopers Inlet in the Pacific coast of the South Island's Otago Peninsula. On that short December summer night, aurora australis also gave luminous, green and reddish hues to the sky above the hills. Aurora shine as atoms and molecules in the upper atmosphere are excited by collisions with energetic particles. An upper atmospheric glow distinct from the aurora, a pale greenish airglow caused by a cascade of chemical reactions excited by sunlight, can be traced in diagonal bands at top left.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/DSCF6968-Enhanced-NR.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "A December Summer Night",
//         "url": "https://apod.nasa.gov/apod/image/2312/DSCF6968-Enhanced-NR1024.jpg"
//     },
//     {
//         "date": "2023-12-24",
//         "explanation": "What's that in the center?  Like a butterfly, a white dwarf star begins its life by casting off a cocoon of gas that enclosed its former self.  In this analogy, however, the Sun would be a caterpillar and the ejected shell of gas would become the prettiest cocoon of all.  In the featured cocoon, the planetary nebula designated NGC 2440 contains one of the hottest white dwarf stars known.  The white dwarf can be seen as the bright orange dot near the image center.  Our Sun will eventually become a white dwarf butterfly, but not for another 5 billion years.",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/ngc2440e_hst_960.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "NGC 2440: Cocoon of a New White Dwarf",
//         "url": "https://apod.nasa.gov/apod/image/2312/ngc2440e_hst_960.jpg"
//     },
//     {
//         "copyright": "\nValerio Minato\n",
//         "date": "2023-12-25",
//         "explanation": "Single shots like this require planning.  The first step is to realize that such an amazing triple-alignment actually takes place. The second step is to find the best location to photograph it. But it was the third step: being there at exactly the right time -- and when the sky was clear -- that was the hardest. Five times over six years the photographer tried and found bad weather.  Finally, just ten days ago, the weather was perfect, and a photographic dream was realized. Taken in Piemonte, Italy, the cathedral in the foreground is the Basilica of Superga, the mountain in the middle is Monviso, and, well, you know which moon is in the background. Here, even though the setting Moon was captured in a crescent phase, the exposure was long enough for doubly reflected Earthlight, called the da Vinci glow, to illuminate the entire top of the Moon.    Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/MoonAligned_Minato_2974.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "Cathedral, Mountain, Moon",
//         "url": "https://apod.nasa.gov/apod/image/2312/MoonAligned_Minato_960.jpg"
//     },
//     {
//         "copyright": "\nDavid Payne\n",
//         "date": "2023-12-26",
//         "explanation": "Why is this jellyfish swimming in a sea of stars? Drifting near bright star Eta Geminorum, seen at the right, the Jellyfish Nebula extends its tentacles from the bright arcing ridge of emission left of center.  In fact, the cosmic jellyfish is part of bubble-shaped supernova remnant IC 443, the expanding debris cloud from a massive star that exploded.  Light from the explosion first reached planet Earth over 30,000 years ago.  Like its cousin in astronomical waters, the Crab Nebula supernova remnant IC 443 is known to harbor a neutron star -- the remnant of the collapsed stellar core.  The Jellyfish Nebula is about 5,000 light-years away.  At that distance, the featured image would span about 140 light-years across.   Your Sky Surprise: What picture did APOD feature on your birthday? (post 1995)",
//         "hdurl": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_7846.jpg",
//         "media_type": "image",
//         "service_version": "v1",
//         "title": "IC 443: The Jellyfish Nebula",
//         "url": "https://apod.nasa.gov/apod/image/2312/Jellyfish_Payne_960.jpg"
//     }
// ]

export default function Home() {
    const todayDate = useMemo(() => new Date(), [])
    const curRef = useRef<HTMLInputElement>(null)
    const startRef = useRef<HTMLInputElement>(null)
    const endRef = useRef<HTMLInputElement>(null)

    const [current, setCurrent] = useState(variables.DateToString(todayDate))
    const [startDate, setStartDate] = useState(variables.DateToString(new Date(new Date().setDate(todayDate.getDate() - variables.DAYS_OFFSET))))
    const [endDate, setEndDate] = useState(variables.DateToString(todayDate))
    const [page, setPage] = useState(1)

    const { data, isLoading, isError } = useGetByDateQuery(current);
    const { data: dataRange, isLoading: isLoadingRange, isError: isErrorRange } = useGetByRangeQuery({ start: startDate, end: endDate });


    const pagePics = useMemo(() => dataRange?.slice((page - 1) * variables.PICS_PER_PAGE, (page - 1) * variables.PICS_PER_PAGE + 20), [page, isLoadingRange])

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
        <main className={styles.main}>
            <section className={styles.wrapper}>
                {
                    !isLoading && data ?
                        <div className={styles.frame}>
                            <div className={styles.current_left}>
                                <div className={styles.current_pic}>
                                    {
                                        data.media_type === 'video' ?
                                            <video className={styles.current_img} src={data.url}></video> :
                                            <img className={styles.current_img} src={data.url} alt="Picture of the day" />
                                    }
                                </div>
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
                }
            </section>
            <section className={styles.wrapper}>
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
                        !isLoadingRange && pagePics ? pagePics.map(pic =>
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
                </div>
            </section>
        </main>
    )
}
