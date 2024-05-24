import {
  Box,
  Button,
  ButtonText,
  Card,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { DATA, DATA2 } from "../utils/data";

interface ChartData {
  day: number;
  highTmp: number;
}

interface Props {
  chartData: ChartData[];
  setChartData: (data: ChartData[]) => void;
}

export const BottomSection = ({ chartData, setChartData }: Props) => {
  return (
    <>
      <Box
        marginTop={5}
        paddingTop={10}
        width="95%"
        height="30%"
        justifyContent="center"
      >
        <Card>
          <HStack justifyContent="space-between">
            <VStack space="xs">
              <Text size="2xl" fontWeight="bold">
                Apple Computers
              </Text>
              <Text size="lg" fontWeight="bold">
                NASDAQ
              </Text>
              <Text size="lg">Past Year</Text>
            </VStack>
          </HStack>
        </Card>
      </Box>
      <Button
        onPress={() => {
          if (chartData === DATA) {
            setChartData(DATA2);
          } else {
            setChartData(DATA);
          }
        }}
      >
        <ButtonText size="lg">Update Chart</ButtonText>
      </Button>
    </>
  );
};
