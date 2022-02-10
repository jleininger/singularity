import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import "./index.css";

import settingsState from "../../state/settings";

function SidePanel() {
  const settings = useSnapshot(settingsState);

  const handleColorChange = (color) => {
    settingsState.colors.dots = color;
  };

  return (
    <div className="side-panel">
      <h1>Options</h1>
      <label id="dot-color">Dot Color</label>
      <HexColorPicker
        color={settings.colors.dots}
        onChange={handleColorChange}
      />
    </div>
  );
}

export default SidePanel;
