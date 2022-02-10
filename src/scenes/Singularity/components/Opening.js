import { useCallback, useState } from "react";
import AnimatedText from "../../../components/TextFade";

const openingText = ["Welcome", "Click to move"];

function Opening({ onTextChange }) {
  const [textIndex, setTextIndex] = useState(0);
  const changeText = useCallback(() => {
    if (textIndex < openingText.length - 1) {
      setTextIndex(textIndex + 1);
      onTextChange(textIndex);
    }
  }, [textIndex, onTextChange]);

  return (
    <AnimatedText
      position={[0, 0, 300]}
      text={openingText[textIndex]}
      fadeIn
      fadeOut={textIndex < openingText.length - 1}
      onFadeFinished={changeText}
      fontSize={7}
    />
  );
}

export default Opening;
