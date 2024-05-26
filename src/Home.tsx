import { FlatList, TouchableOpacity } from "react-native";

import { Box, Card, SafeAreaView, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { screens } from "./Navigation/screens";

export const Home = () => {
  const { navigate } = useNavigation<any>();

  return (
    <SafeAreaView width="100%" $dark-bg="$black" $light-bg="$white" flex={1}>
      <Box width="100%" $dark-bg="$black" $light-bg="$white" flex={1}>
        <FlatList
          data={screens}
          style={{ paddingHorizontal: 20, paddingTop: 20 }}
          renderItem={(value) => {
            return (
              <TouchableOpacity
                onPress={() => navigate(value.item.navigationId)}
              >
                <Card height={75} justifyContent="center" marginVertical={10}>
                  <Text textAlign="center">{value.item.name}</Text>
                </Card>
              </TouchableOpacity>
            );
          }}
        />
      </Box>
    </SafeAreaView>
  );
};
