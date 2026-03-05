import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import "../style/faceExpression.scss";
import "../../shared/button.scss"

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "VIDEO",
      outputFaceBlendshapes: true,
      numFaces: 1,
    });

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const detect = async () => {
    const video = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    const result = await faceLandmarker.detectForVideo(
      video,
      performance.now(),
    );

    if (result.faceBlendshapes.length > 0) {
      const shapes = result.faceBlendshapes[0].categories;

      const getScore = (name) =>
        shapes.find((s) => s.categoryName === name)?.score || 0;

      const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
      const browDown = getScore("browDownLeft") + getScore("browDownRight");
      const mouthOpen = getScore("jawOpen");
      const browInnerUp = getScore("browInnerUp");
      const mouthFrown =
        getScore("mouthFrownLeft") + getScore("mouthFrownRight");

      // console.log(browDown)

      let detectedEmotion = "Neutral";

      if (smile > 0.6) detectedEmotion = "Happy";
      else if (mouthOpen > 0.6) detectedEmotion = "Surprised";
      else if (browDown > 0.02) detectedEmotion = "Angry";
      else if (browInnerUp > 0.4 || mouthFrown > 0.4) {
        detectedEmotion = "Sad";
      }

      setEmotion(detectedEmotion);
    }

    requestAnimationFrame(detectLoop);
  };

  return (
    <div className="face-expression-page" style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "500px", borderRadius: "1rem" }}
      />
      <h2>Emotion: {emotion}</h2>
      <br />
      <button className="button primary-button" onClick={detect}>Detect Expression</button>
    </div>
  );
}
