import { Box } from "@gluestack-ui/themed";
import React, { useState } from "react";

import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useColorScheme } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";
import { Area, CartesianChart, Line, useChartPressState } from "victory-native";

import { Text as SKText } from "@shopify/react-native-skia";
import { BottomSection } from "./components/BottomSection";
import { DATA } from "./utils/data";

const inter = require("../../roboto.ttf");
const interBold = require("../../roboto-bold.ttf");

export const LineChart = () => {
  const font = useFont(inter, 12);
  const chartFont = useFont(interBold, 30);
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const colorMode = useColorScheme() as COLORMODES;
  const [chartData, setChartData] = useState(DATA);

  const value = useDerivedValue(() => {
    return "$" + state.y.highTmp.value.value.toFixed(2);
  }, [state]);

  const labelColor = colorMode === "dark" ? "white" : "black";
  const lineColor = colorMode === "dark" ? "lightgrey" : "black";

  return (
    <Box
      width="100%"
      $dark-bg="$black"
      $light-bg="$white"
      flex={1}
      alignItems="center"
      paddingHorizontal={5}
      paddingVertical={30}
    >
      <Box paddingTop={10} width="95%" height="60%">
        <CartesianChart
          data={chartData}
          xKey="day"
          yKeys={["highTmp"]}
          domainPadding={{ top: 30 }}
          axisOptions={{
            font,
            labelColor,
            lineColor,
          }}
          chartPressState={state}
        >
          {({ points, chartBounds }) => (
            <>
              <SKText
                x={chartBounds.left + 10}
                y={40}
                font={chartFont}
                text={value}
                color={labelColor}
                style={"fill"}
              />
              <Line
                points={points.highTmp}
                color="lightgreen"
                strokeWidth={3}
                animate={{ type: "timing", duration: 500 }}
              />
              <Area
                points={points.highTmp}
                y0={chartBounds.bottom}
                animate={{ type: "timing", duration: 500 }}
              >
                <LinearGradient
                  start={vec(chartBounds.bottom, 200)}
                  end={vec(chartBounds.bottom, chartBounds.bottom)}
                  colors={["green", "#90ee9050"]}
                />
              </Area>

              {isActive ? (
                <ToolTip x={state.x.position} y={state.y.highTmp.position} />
              ) : null}
            </>
          )}
        </CartesianChart>
      </Box>
      <BottomSection chartData={chartData} setChartData={setChartData} />
    </Box>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={"grey"} opacity={0.8} />;
}
