import Canvas from "../Canvas";
import { useSettingsState } from "../../state/settings";
import RandomSpheres from "../../components/InstancedSpheres";
import { useNavigate } from "react-router-dom";
import Camera from "./components/Camera";
import { BLACK } from "../../constants/colors";
import { useState } from "react";
import FadeFog from "../../components/FadeFog";

function OrbsScene() {
  const [fadeOut, setFadeOut] = useState(false);
  const { colors } = useSettingsState();
  const navigate = useNavigate();

  function handleSongEnd() {
    setTimeout(() => {
      setFadeOut(true);
    }, 60000);
  }

  return (
    <Canvas>
      {fadeOut ? (
        <FadeFog
          fadeIn={false}
          fadeAmount={3}
          onEnd={() => {
            navigate("/");
          }}
        />
      ) : (
        <fog attach="fog" args={[BLACK, 0, 2000]} />
      )}
      <RandomSpheres
        audioUrl="/fireflies_main_loop.mp3"
        amount={250}
        spread={3000}
        scale={1}
        color={colors.dots}
        onEnded={handleSongEnd}
      />
      <RandomSpheres
        audioUrl="/fireflies_main_loop.mp3"
        amount={150}
        spread={1500}
        scale={2}
        color={colors.dots}
      />

      <Camera />
    </Canvas>
  );
}

export default OrbsScene;
