import { useColorScheme } from "react-native";

import { COLORMODES } from "@gluestack-style/react/lib/typescript/types";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/Home";
import { LineChart } from "./src/LineChart/LineChart";

import { LogBox } from "react-native";
import { BarChart } from "./src/BarChart/BarChart";

if (__DEV__) {
  const ignoreWarns = [
    "CartesianChart: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

const Stack = createNativeStackNavigator();

export default function App() {
  const colorMode = useColorScheme() as COLORMODES;

  return (
    <GluestackUIProvider config={config} colorMode={colorMode}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colorMode === "dark" ? "black" : "white",
            },
            headerTintColor: colorMode === "dark" ? "white" : "black",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Line Chart" component={LineChart} />
          <Stack.Screen name="Bar Chart" component={BarChart} />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
