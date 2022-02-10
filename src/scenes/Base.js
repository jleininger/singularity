import Water from "../components/Water";

import { BLACK } from "../constants/colors";

function BaseScene({ fadeInAmount = 1 }) {
  return (
    <>
      <ambientLight />
      <color attach="background" args={[BLACK]} />
      <Water waterColor={BLACK} sunColor={BLACK} />
    </>
  );
}

export default BaseScene;
