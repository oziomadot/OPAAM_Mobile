import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

type TabBarBackgroundProps = {
  style?: any;
};

export default function TabBarBackground({ style }: TabBarBackgroundProps) {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={80}
        tint="light"
        style={[styles.background, style]}
      />
    );
  }

  return (
    <View
      style={[
        styles.background,
        { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 50, // Default height, will be overridden by the tab bar
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});
