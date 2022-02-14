import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import useAudio from "../hooks/useAudio";

const tempSpheres = new THREE.Object3D();
const finalPos = new THREE.Vector3(0, -2000, 0);

function InstancedSpheres({
  audioUrl = "",
  amount = 30,
  color = "hotpink",
  scale = 3,
  spread = 50,
  onEnded = () => {},
}) {
  const meshRef = useRef();
  const hoveredDots = useRef([]);
  const activeDots = useRef([]);
  const firstPass = useRef(true);
  const [sphereGeometry] = useState(
    () => new THREE.SphereGeometry(1, 32, 32, 32),
    []
  );
  const [material] = useState(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        toneMapped: false,
        emissive: true,
        emissiveIntensity: 2,
      })
  );
  const data = useMemo(() => {
    return new Array(amount).fill().map(() => ({
      startPos: new THREE.Vector3(0, 0, 0),
      targetPos: new THREE.Vector3(
        Math.random() * spread - spread / 2,
        Math.random() * spread,
        Math.random() * spread - spread / 2
      ),
      scale: Math.random() + scale,
      lerpSpeed: (Math.random() + 0.5) * 0.0005,
    }));
  }, [amount, spread, scale]);
  const { update } = useAudio(audioUrl, 1, true, false, onEnded);

  useEffect(() => {
    setTimeout(() => {
      firstPass.current = false;
    }, 100);
  }, []);

  useFrame(() => {
    const freqAvg = update();

    for (let i = 0; i < data.length; i++) {
      const { startPos, targetPos, scale, lerpSpeed } = data[i];
      let adjustedScale =
        activeDots.current.includes(i) && freqAvg > 0 ? update() / 10 : scale;

      if (hoveredDots.current.includes(i)) {
        adjustedScale = adjustedScale * 2;
      }

      const position =
        !firstPass.current && freqAvg === 0
          ? targetPos.lerp(finalPos, lerpSpeed)
          : startPos.lerp(targetPos, 0.01);
      tempSpheres.position.set(position.x, position.y, position.z);
      tempSpheres.scale.set(adjustedScale, adjustedScale, adjustedScale);
      tempSpheres.updateMatrix();
      meshRef.current.setMatrixAt(i, tempSpheres.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[sphereGeometry, material, amount]}
      onPointerEnter={({ instanceId }) => {
        hoveredDots.current.push(instanceId);
      }}
      onPointerLeave={({ instanceId }) => {
        hoveredDots.current.splice(hoveredDots.current.indexOf(instanceId), 1);
      }}
      onClick={({ instanceId }) => {
        if (activeDots.current.includes(instanceId)) {
          activeDots.current.splice(activeDots.current.indexOf(instanceId), 1);
        } else {
          activeDots.current.push(instanceId);
        }
      }}
    />
  );
}

export default InstancedSpheres;
