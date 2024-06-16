import { Rect, RoundedRect } from "@shopify/react-native-skia";
import { CANVAS_HEIGHT, CANVAS_MIDDLE } from "../utils/constants";

export const Outline = () => {
  return (
    <>
      <RoundedRect
        x={CANVAS_MIDDLE - 125}
        y={40}
        width={8}
        height={CANVAS_HEIGHT}
        r={10}
        color={"white"}
      />
      <RoundedRect
        x={CANVAS_MIDDLE + 115}
        y={40}
        width={8}
        height={CANVAS_HEIGHT}
        r={10}
        color={"white"}
      />
      <Rect
        x={75}
        y={CANVAS_HEIGHT - 8}
        width={245}
        height={8}
        color={"white"}
      />
      <Rect
        x={83}
        y={CANVAS_HEIGHT - 23}
        width={232}
        height={15}
        color={"black"}
      />
    </>
  );
};
