import { useEffect, useRef } from "react";

function useTimeout(callback, delay) {
  const timeoutRef = useRef();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay > 0) {
      timeoutRef.current = window.setTimeout(tick, delay);

      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
}

export default useTimeout;
