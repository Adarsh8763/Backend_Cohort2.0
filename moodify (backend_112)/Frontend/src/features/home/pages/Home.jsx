import {useSong} from "../hooks/useSong"
import FaceExpression from "../../expression/pages/FaceExpression"
import Player from "../components/Player"

const Home = () => {

  const { handleGetSong } = useSong()

  return (  
    <>
      <FaceExpression 
      onClick={(expression) => {
        // console.log(expression)
        handleGetSong({mood: expression})
        }}/>
      <Player/>
    </> 
  )
}

export default Home

