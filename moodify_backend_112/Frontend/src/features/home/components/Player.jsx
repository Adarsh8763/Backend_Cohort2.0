import { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";
import "../style/player.scss";

const Player = () => {
  const { song } = useSong();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [song]);

  const togglePlay = () => {
    if (!song) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  if (!song) {
    return <div className="player-empty">🎧 Select a mood</div>;
  }

  return (
    <div className="player-container">
      <div className="player-card">
        <div className="innerbox">
          <img src={song.posterURL} alt="poster" className="poster" />
          <h2 className="title">{song.title}</h2>
        </div>

        <p className="mood">Mood: {song.mood}</p>

        <audio ref={audioRef} src={song.songURL} />

        <button className="button primary-button" onClick={togglePlay}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>
    </div>
  );
};

export default Player;
