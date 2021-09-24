import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Slide from "./Slide";
const cards = [
  {
    color: "#3984FF",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/1.png",
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/2.png",
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    picture:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/3.png",
    aspectRatio: 391.25 / 520,
  },
];
const { width } = Dimensions.get("window");

const ReanimatedScroll = () => {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      decelerationRate="fast"
      pagingEnabled
      scrollEventThrottle={16}
      horizontal
    >
      {cards.map((slide, index) => {
        const colors = [
          index === 0 ? slide.color : cards[index - 1].color,
          slide.color,
          index === cards.length - 1 ? slide.color : cards[index + 1].color,
        ];
        return (
          <Slide
            index={index}
            slide={slide}
            key={index}
            x={x}
            colors={colors}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default ReanimatedScroll;

const styles = StyleSheet.create({});
