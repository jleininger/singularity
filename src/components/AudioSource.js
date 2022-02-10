import * as THREE from "three";
import { useLoader, useThree } from "@react-three/fiber";
import React, { useRef, useEffect, useState } from "react";

function AudioSource({ url, distance, loop = true, play = true, onEnded }) {
  const audioRef = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    audioRef.current.setBuffer(buffer);
    audioRef.current.setRefDistance(distance);
    audioRef.current.setLoop(loop);
    camera.add(listener);

    if (play) {
      audioRef.current.play();
    }

    return () => camera.remove(listener);
  }, [buffer, distance, camera, listener, loop, play]);

  return <positionalAudio ref={audioRef} args={[listener]} onEnded={onEnded} />;
}

export default AudioSource;
