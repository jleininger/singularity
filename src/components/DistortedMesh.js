import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import useAudio from "../hooks/useAudio";
import AudioSource from "./AudioSource";

function DistortedMesh({
  position,
  audioUrl,
  onClick,
  loop = true,
  onAudioEnded,
  playAudio = true,
}) {
  const ref = useRef(null);
  const shrink = useRef(false);
  const [hover, setHover] = useState(false);
  const [clickEnabled, setClickEnabled] = useState(false);
  const { update, source } = useAudio(audioUrl, 0, false, true);
  const handleEnded = useCallback(() => {
    source.stop();
    onAudioEnded();
    setClickEnabled(true);
  }, [onAudioEnded, source, setClickEnabled]);
  const handleOnClick = useCallback(() => {
    if (clickEnabled) {
      shrink.current = true;
    }
  }, [clickEnabled]);

  useFrame(() => {
    if (playAudio) {
      ref.current.material.distort = update() / 100;
    }

    if (shrink.current) {
      ref.current.scale.lerp(new Vector3(0, 0, 0), 0.3);

      if (ref.current.scale.x <= 0.1) {
        onClick && onClick();
      }
    }
  });

  useEffect(() => {
    if (playAudio) {
      if (!source.ended) {
        source.start(0);
      }
    }
  }, [playAudio, source]);

  return (
    <Icosahedron
      ref={ref}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={handleOnClick}
      castShadow
      receiveShadow
      args={[3, 32]}
      position={position}
    >
      <MeshDistortMaterial
        attach="material"
        color={hover ? "#55ff55" : "#00ff00"}
        toneMapped={false}
      />
      <AudioSource
        play={playAudio}
        url={audioUrl}
        distance={20}
        loop={loop}
        onEnded={handleEnded}
      />
    </Icosahedron>
  );
}

export default DistortedMesh;
