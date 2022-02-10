import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";
import useTimeout from "../hooks/useTimeout";
import MaterialText from "./Text";

function TextFade({
  text,
  amount = 0.005,
  position,
  fontSize = 12,
  fadeIn = true,
  fadeOut = false,
  fadeTimeout = 5000,
  onFadeFinished = () => {},
}) {
  const [timeoutDelay, setTimeoutDelay] = useState(0);
  const [fadingIn, setFadingIn] = useState(fadeIn);
  const [textOpacity, setTextOpacity] = useState(0);

  useFrame(() => {
    if (fadingIn && textOpacity < 1) {
      setTextOpacity(textOpacity + amount);
    } else if (textOpacity > 0) {
      setTextOpacity(textOpacity - amount);
    }
  });

  useEffect(() => {
    if (textOpacity >= 1) {
      if (fadeOut) {
        setTimeoutDelay(fadeTimeout);
      }
    }

    if (!fadingIn && textOpacity <= 0) {
      onFadeFinished();
      setFadingIn(true);
    }
  }, [
    text,
    fadingIn,
    setFadingIn,
    textOpacity,
    fadeOut,
    fadeTimeout,
    onFadeFinished,
  ]);

  useTimeout(() => {
    setFadingIn(false);
  }, timeoutDelay);

  return (
    <MaterialText
      fontSize={fontSize}
      text={text}
      position={position}
      opacity={textOpacity}
    />
  );
}

export default TextFade;
