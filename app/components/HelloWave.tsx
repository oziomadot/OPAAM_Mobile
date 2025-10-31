import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  Easing
} from 'react-native-reanimated';

export function HelloWave() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(10, { 
        duration: 1500,
        easing: Easing.inOut(Easing.ease)
      }),
      -1, // Infinite repeat
      true // Reverse the animation
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.Text style={[styles.text, animatedStyle]}>
      👋
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
