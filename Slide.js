import React from "react";
import { Dimensions, StyleSheet, Image, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useCode,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  addCurve,
  cartesian2Canvas,
  createPath,
  move,
  serialize,
} from "react-native-redash";
//  import {create} from 'react-native-redash/lib/module/v1'
import Svg, { Circle, Path } from "react-native-svg";
// import  {} from 'react-svg'

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width } = Dimensions.get("window");
const C = 0.551915024494;

const vec = (x, y) => cartesian2Canvas({ x, y }, { x: 1, y: 1 });
const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C); //
const P23 = vec(-1, 0); //left middle

// const P30 = vec(-1, 0);
const P31 = vec(-1, C); //
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

const Slide = ({ slide, index, x, colors }) => {
  const AnimatedProps = useAnimatedProps(() => {
    const progress = (x.value - index * width) / width;
    const offset = interpolate(progress, [0, 0.3], [0, -1], Extrapolate.CLAMP);
    const addX = (v) => ({ x: v.x + offset, y: v.y });
    const path = createPath({
      x: P00.x + offset,
      y: P00.y,
    });

    addCurve(path, {
      c1: addX(P01),
      c2: P02,
      to: P03,
    });
    addCurve(path, {
      c1: P11,
      c2: P12,
      to: addX(P13),
    });
    addCurve(path, {
      c1: addX(P21),
      c2: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P22.y,
      },
      to: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P23.y,
      },
    });
    addCurve(path, {
      c1: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P31.y,
      },
      c2: addX(P32),
      to: addX(P33),
    });
    const d = serialize(path);

    return { d, fill: interpolateColor(progress, [-1, 0, 1], colors) };
  });
  //   const animation = useSharedValue(1);
  //   const style = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ translateX: animation.value }],
  //     };
  //   });
  //   useCode(()=>{
  //     animation.value=interpolate()
  //   },[x.value])
  //   animation.value = withSpring(
  //     interpolate(
  //       (x.value - index * width) / width,
  //       [-0.3, 1],
  //       [-1, 1],
  //       Extrapolate.CLAMP
  //     )
  //   );
  return (
    <View style={styles.container}>
      <Svg width={width} height={width} viewBox="0 0 2 2">
        <AnimatedPath animatedProps={AnimatedProps} />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={{ uri: slide.picture }}
          style={[
            {
              width: width / 2,
              height: (width / 2) * slide.aspectRatio,
            },
            // style,
          ]}
        />
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    // height: null,
    justifyContent: "center",
    alignItems: "center",
  },
});
