import React from "react";
import { StyleSheet, View } from "react-native";
import ReanimatedScroll from "./ReanimatedScroll";
export default function App() {
  return (
    <View style={styles.container}>
      <ReanimatedScroll />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
