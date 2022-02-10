import * as THREE from "three";
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Water } from "three-stdlib";

extend({ Water });

function WaterShader({
  waterColor = "#002230",
  sunColor = "#2B2531",
  y = -10,
  textureFidelity = 512,
  size = 15000,
}) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geometry = useMemo(() => new THREE.PlaneGeometry(size, size), [size]);
  const config = useMemo(
    () => ({
      textureWidth: textureFidelity,
      textureHeight: textureFidelity,
      waterNormals,
      sunColor,
      waterColor,
      distortionScale: 2,
      fog: true,
      format: gl.encoding,
    }),
    [waterNormals, gl.encoding, waterColor, sunColor, textureFidelity]
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta * 0.8;
    }
  });

  return (
    <water
      ref={ref}
      args={[geometry, config]}
      rotation-x={-Math.PI / 2}
      position-y={y}
    />
  );
}

export default WaterShader;
