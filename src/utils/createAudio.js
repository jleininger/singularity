const noop = () => {};

async function createAudio(url, autoPlay = true, loop = false, onEnded = noop) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const context = new (window.AudioContext || window.webkitAudioContext)({
    latencyHit: "interactive",
  });
  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = loop;
  // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
  // which makes it too awkward for a little demo since you need to load the async data first
  if (autoPlay) {
    source.start(0);
  }
  // Create gain node and an analyser
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);
  // The data array receive the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);

  source.onended = () => {
    source.stop(0);
    onEnded();
  };

  return {
    context,
    source,
    gain,
    data,
    // This function gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data);
      // Calculate a frequency average
      return (data.avg = data.reduce(
        (prev, cur) => prev + cur / data.length,
        0
      ));
    },
  };
}

export default createAudio;