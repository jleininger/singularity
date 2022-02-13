import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import TextFade from "../../../components/TextFade";
import Opening from "./Opening";

function IntroText({ breakpoints = [260, 160], onTextChange }) {
  const { camera } = useThree();
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useFrame(() => {
    const cameraPos = camera.position.z;
    if (
      !showText1 &&
      cameraPos <= breakpoints[0] &&
      cameraPos >= breakpoints[1]
    ) {
      setShowText1(true);
    }

    if (!showText2 && cameraPos <= breakpoints[1]) {
      setShowText2(true);
    }
  });

  return (
    <>
      <Opening onTextChange={onTextChange} />
      {showText1 ? (
        <TextFade
          position={[0, 0, 200]}
          fadeIn
          fontSize={6}
          text="In every death..."
        />
      ) : null}
      {showText2 ? (
        <TextFade
          position={[0, 0, 100]}
          fadeIn
          fontSize={6}
          text="There is new life."
        />
      ) : null}
    </>
  );
}

export default IntroText;
