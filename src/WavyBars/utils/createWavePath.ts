import { Skia } from "@shopify/react-native-skia";
import {
  CANVAS_HEIGHT,
  CANVAS_MIDDLE,
  FREQUENCY,
  HORIZONTAL_SHIFT,
  INITIAL_AMPLITUDE,
  INITIAL_VERTICAL_SHIFT,
} from "./constants";

export function createWavePath(phase = 20) {
  "worklet";
  const points = Array.from({ length: CANVAS_MIDDLE }, (_, index) => {
    const angle =
      ((index - HORIZONTAL_SHIFT) / CANVAS_MIDDLE) * (Math.PI * FREQUENCY) +
      phase;
    return [
      index,
      INITIAL_AMPLITUDE * Math.sin(angle) + INITIAL_VERTICAL_SHIFT,
    ];
  });

  const path = Skia.Path.Make();
  path.moveTo(HORIZONTAL_SHIFT, points[0][1]);

  for (const point of points) {
    path.lineTo(point[0] + HORIZONTAL_SHIFT, point[1]);
  }

  path.lineTo(CANVAS_MIDDLE + 100, CANVAS_HEIGHT);
  path.lineTo(HORIZONTAL_SHIFT, CANVAS_HEIGHT);

  return path;
}
