import React, { useState } from "react";

import { Text, Box, Button, ButtonText } from "@gluestack-ui/themed";
import { CartesianChart, Bar, useChartPressState } from "victory-native";
import { Circle, useFont, vec } from "@shopify/react-native-skia";
import { View, useColorScheme } from "react-native";
import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import { LinearGradient, Text as SKText } from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";

const inter = require("../../roboto.ttf");

const DATA = (length: number = 10) =>
  Array.from({ length }, (_, index) => ({
    month: index + 1,
    listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }));

export const BarChart = () => {
  const [data, setData] = useState(DATA(5));
  const font = useFont(inter, 12);
  const toolTipFont = useFont(inter, 24);
  const colorMode = useColorScheme() as COLORMODES;
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { listenCount: 0 },
  });

  const isDark = colorMode === "dark";

  const value = useDerivedValue(() => {
    return "$" + state.y.listenCount.value.value;
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.listenCount.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!toolTipFont) {
      return 0;
    }
    return (
      state.x.position.value - toolTipFont.measureText(value.value).width / 2
    );
  }, [value, toolTipFont]);

  return (
    <Box
      $dark-bg="$black"
      $light-bg="$white"
      flex={1}
      paddingHorizontal={5}
      paddingVertical={30}
    >
      <Box paddingTop={10} width="95%" height="80%">
        <CartesianChart
          xKey="month"
          padding={5}
          yKeys={["listenCount"]}
          domain={{ y: [0, 100] }}
          domainPadding={{ left: 50, right: 50, top: 30 }}
          axisOptions={{
            font,
            tickCount: 5,
            formatXLabel: (value) => {
              const date = new Date(2023, value - 1);
              return date.toLocaleString("default", { month: "short" });
            },
            lineColor: isDark ? "#71717a" : "#d4d4d8",
            labelColor: isDark ? "white" : "black",
          }}
          chartPressState={state}
          data={data}
        >
          {({ points, chartBounds }) => {
            return (
              <>
                <Bar
                  points={points.listenCount}
                  chartBounds={chartBounds}
                  animate={{ type: "timing", duration: 1000 }}
                  roundedCorners={{
                    topLeft: 10,
                    topRight: 10,
                  }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400)}
                    colors={["green", "#90ee9050"]}
                  />
                </Bar>

                {isActive ? (
                  <>
                    <SKText
                      font={toolTipFont}
                      color={isDark ? "white" : "black"}
                      x={textXPosition}
                      y={textYPosition}
                      text={value}
                    />
                    <Circle
                      cx={state.x.position}
                      cy={state.y.listenCount.position}
                      r={8}
                      color={"grey"}
                      opacity={0.8}
                    />
                  </>
                ) : null}
              </>
            );
          }}
        </CartesianChart>
      </Box>
      <Box paddingTop={30} width="95%" height="20%" alignItems="center">
        <Button
          onPress={() => {
            setData(DATA(5));
          }}
        >
          <ButtonText size="lg">Update Chart</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
