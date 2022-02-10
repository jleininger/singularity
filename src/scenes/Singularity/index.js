import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import DistortedMesh from "../../components/DistortedMesh";
import CameraControls from "./components/CameraControls";
import IntroText from "./components/IntroText";
import useAudio from "../../hooks/useAudio";
import FadeInFog from "../../components/FadeFog";
import Canvas from "../Canvas";

function Singularity() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [cameraLocked, setCameraLocked] = useState(true);
  const [loop, setLoop] = useState(true);
  const [clickEnabled, setClickEnabled] = useState(false);
  const onCameraChange = useCallback(() => {
    setLoop(false);
  }, []);

  useAudio("/waves-loop.mp3", 0.05, true, true);

  return (
    <Canvas>
      {showText ? (
        <IntroText
          onTextChange={() => {
            setCameraLocked(false);
          }}
        />
      ) : null}
      <DistortedMesh
        position={[0, 4, 0]}
        audioUrl="/fireflies_intro_loop.mp3"
        playAudio={showText}
        onClick={() => {
          if (clickEnabled) {
            navigate("/singularity/sandbox");
          }
        }}
        loop={loop}
        onAudioEnded={() => {
          setClickEnabled(true);
        }}
      />

      <FadeInFog
        onEnd={() => {
          setShowText(true);
        }}
      />
      <CameraControls locked={cameraLocked} onCameraChange={onCameraChange} />
    </Canvas>
  );
}

export default Singularity;
