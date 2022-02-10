import { FlyControls, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";

const CAMERA_BREAKPOINT = 50;
const MAX_DISTANCE = 400;

function CameraControls({ locked = true, onCameraChange = () => {} }) {
  const [flyCamera, setFlyCamera] = useState(true);
  const { camera } = useThree();

  return flyCamera ? (
    <FlyControls
      onChange={() => {
        if (camera.position.z <= CAMERA_BREAKPOINT) {
          setFlyCamera(false);
          onCameraChange();
        }

        if (camera.position.z >= MAX_DISTANCE) {
          camera.position.z = MAX_DISTANCE;
        }
      }}
      movementSpeed={locked ? 0 : 10}
      rollSpeed={0}
      dragToLook={false}
    />
  ) : (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      maxPolarAngle={Math.PI / 1.9}
      autoRotate
      autoRotateSpeed={-1}
    />
  );
}

export default CameraControls;
