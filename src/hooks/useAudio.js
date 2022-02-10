import { useEffect } from "react";
import { useAsset } from "use-asset";
import createAudio from "../utils/createAudio";

function useAudio(url, volume = 1, autoPlay = true, loop = false, onEnded) {
  const { gain, context, update, data, source } = useAsset(
    () => createAudio(url, autoPlay, loop, onEnded),
    url
  );

  useEffect(() => {
    gain.connect(context.destination);
    gain.gain.value = volume;

    return () => gain.disconnect();
  }, [gain, context, volume]);

  return {
    source,
    data,
    update,
  };
}

export default useAudio;
