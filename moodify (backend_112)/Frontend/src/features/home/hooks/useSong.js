import { SongContext } from "../song.context"
import { getSong } from "../services/song.api"
import { useContext } from "react"

export const useSong = () =>{
    const context = useContext(SongContext)

    const { loading, setLoading, song, setSong } = context

    async function handleGetSong ({ mood }){
        setLoading(true)
        const data = await getSong({ mood })
        setSong(data.song)
        console.log("API DATA:", data)
        setLoading(false) 
    }

    return ({
        loading, song, handleGetSong
    })
}