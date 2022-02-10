import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { BLACK } from "../constants/colors";

const MAX_FOG_DISTANCE = 800;

function FadeFog({ fadeIn = true, fadeAmount = 0.75, onEnd = () => {} }) {
  const [fogAmount, setFogAmount] = useState(fadeIn ? 0 : MAX_FOG_DISTANCE);

  useFrame(() => {
    if (fadeIn) {
      if (fogAmount <= MAX_FOG_DISTANCE) {
        setFogAmount(fogAmount + fadeAmount);
      }
    } else {
      if (fogAmount >= 0) {
        setFogAmount(fogAmount - fadeAmount);
      }
    }
  });

  useEffect(() => {
    if (
      (fadeIn && fogAmount >= MAX_FOG_DISTANCE) ||
      (!fadeIn && fogAmount <= 0)
    ) {
      onEnd();
    }
  }, [fadeIn, fogAmount, onEnd]);

  return <fog attach="fog" args={[BLACK, 0, fogAmount]} />;
}

export default FadeFog;
