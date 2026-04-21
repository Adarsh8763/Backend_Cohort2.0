import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children}) => {
    const [song, setSong] = useState(
        {"title": "Jaavi Na [DownloadMing.WS]",
        "songURL": "https://ik.imagekit.io/akk8763/cohort-2/moodify/songs/Jaavi_Na__DownloadMing.WS__MdNSx76IB.mp3",
        "posterURL": "https://ik.imagekit.io/akk8763/Cohort-2/moodify/posters/Jaavi_Na__DownloadMing.WS__gVVfWVliS.jpeg",
        "mood": "happy"}
    )
    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    )
} 