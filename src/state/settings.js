import { proxy, useSnapshot } from "valtio";

const state = proxy({
  mute: false,
  colors: {
    dots: "#00ff00",
    water: "#000000",
    sun: "#000000",
  },
});

export const useSettingsState = () => useSnapshot(state);

export default state;
