import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function Camera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.far = 4000;
  }, [camera]);

  return <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />;
}

export default Camera;
