import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonText } from "@spendspot/ui-components/button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Button variant="default" onPress={() => console.log("Button pressed!")}>
        <ButtonText>Press me</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
