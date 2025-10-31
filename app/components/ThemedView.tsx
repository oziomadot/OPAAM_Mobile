import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type ThemedViewProps = {
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  children,
  ...otherProps
}: ThemedViewProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = colorScheme === 'light'
    ? lightColor ?? Colors.light.background
    : darkColor ?? Colors.dark.background;

  return (
    <View
      style={[{ backgroundColor }, styles.container, style]}
      {...otherProps}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
