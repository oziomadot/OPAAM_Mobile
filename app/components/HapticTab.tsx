import * as Haptics from 'expo-haptics';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleProp, ViewStyle, View } from 'react-native';

interface HapticTabProps extends Omit<BottomTabBarButtonProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function HapticTab({
  children,
  onPress,
  style,
  accessibilityState,
  accessibilityLabel,
  testID,
  ...props
}: HapticTabProps) {
  const handlePress = (e: Parameters<Required<BottomTabBarButtonProps>['onPress']>[0]) => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Call the original onPress handler if it exists
    if (onPress) {
      onPress(e);
    }
  };

  // Filter out any props that shouldn't be passed to TouchableOpacity
  const {
    // Remove any props that might cause issues
    ...safeProps
  } = props as any;

  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
        {...safeProps}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
}
