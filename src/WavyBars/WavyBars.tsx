import { View } from "@gluestack-ui/themed";
import {
  Canvas,
  Circle,
  LinearGradient,
  Path,
  Text,
  useClock,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Outline } from "./components/Outline";
import {
  CANVAS_HEIGHT,
  CANVAS_MIDDLE,
  MAXIMUM_Y,
  MINIMUM_Y,
  font,
} from "./utils/constants";
import { createWavePath } from "./utils/createWavePath";

export const WavyBars = () => {
  const currentPoint = useSharedValue(MINIMUM_Y);
  const currentValue = useSharedValue("100%");
  const clock = useClock();
  const textFont = useFont(font, 45);

  const gesture = Gesture.Pan().onChange(({ y }) => {
    if (y <= MINIMUM_Y) {
      currentPoint.value = MINIMUM_Y;
      return;
    } else if (y >= MAXIMUM_Y) {
      currentPoint.value = MAXIMUM_Y;
      return;
    }
    currentPoint.value = y;
  });

  const path = useDerivedValue(() => {
    const current = (clock.value / 225) % 225;
    const start = createWavePath(current)!;
    const end = createWavePath(Math.PI * current)!;
    return start.interpolate(end, 0.5)!;
  }, [clock]);

  const pathTransform = useDerivedValue(() => {
    const yPosition = currentPoint.value - 80;
    return [{ translateY: yPosition }];
  }, [currentPoint]);

  const textXPosition = useDerivedValue(() => {
    if (!textFont) {
      return CANVAS_MIDDLE / 2;
    }

    const totalRange = MAXIMUM_Y - MINIMUM_Y;
    const val = 1 - (currentPoint.value / totalRange - 0.15);
    const displayPercentage = Math.abs(val * 100).toFixed(0);
    currentValue.value = `${displayPercentage}%`;
    return CANVAS_MIDDLE - textFont.measureText(currentValue.value).width / 2;
  }, [currentPoint, textFont]);

  if (!textFont) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width: CANVAS_MIDDLE * 2, height: CANVAS_HEIGHT }}>
          <Path
            path={path}
            style="fill"
            color={"red"}
            transform={pathTransform}
          >
            <LinearGradient
              start={vec(CANVAS_MIDDLE, 0)}
              end={vec(CANVAS_MIDDLE, CANVAS_HEIGHT * 2)}
              colors={["red", "yellow"]}
            />
          </Path>
          <Text
            x={textXPosition}
            y={40}
            text={currentValue}
            font={textFont}
            color={"white"}
          />
          <Circle
            cx={CANVAS_MIDDLE + 155}
            cy={currentPoint}
            r={15}
            color={"white"}
          />
          <Outline />
        </Canvas>
      </GestureDetector>
    </View>
  );
};
