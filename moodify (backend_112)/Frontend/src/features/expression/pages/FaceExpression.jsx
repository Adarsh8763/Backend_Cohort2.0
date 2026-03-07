import React, { useEffect, useRef, useState } from "react";
import "../style/faceExpression.scss";
import "../../shared/button.scss"
import { init, detect } from '../utils/utils'

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);

  useEffect(() => {
    init(faceLandmarkerRef, videoRef);
  }, []);

  

  return (
    <div className="face-expression-page" style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "25rem", borderRadius: "1rem", border: "solid 1px whitesmoke" }}
      />
      <h2>Emotion: {emotion}</h2>
      <br />
      <button className="button primary-button" onClick={()=>{detect(faceLandmarkerRef, videoRef, setEmotion)}}>Detect Expression</button>
    </div>
  );
}
