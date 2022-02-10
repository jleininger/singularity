import { Text } from "@react-three/drei";
import { DoubleSide } from "three";

function MaterialText({
  color = "#00ff00",
  fontUrl = "/BungeeHairline-Regular.ttf",
  fontSize = 12,
  opacity = 1,
  position,
  text,
  textAlign = "center",
}) {
  return (
    <Text
      position={position}
      fontSize={fontSize}
      lineHeight={1}
      textAlign={textAlign}
      font={fontUrl}
      anchorX="center"
      anchorY="middle"
    >
      <meshStandardMaterial
        attach="material"
        side={DoubleSide}
        color={color}
        opacity={opacity}
      />
      {text}
    </Text>
  );
}

export default MaterialText;
