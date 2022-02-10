import { Canvas } from "@react-three/fiber";
import BaseScene from "./Base";

function CanvasScene({ children }) {
  return (
    <Canvas mode="concurrent" camera={{ position: [0, 0, 350] }}>
      {children}
      <BaseScene />
    </Canvas>
  );
}

export default CanvasScene;
