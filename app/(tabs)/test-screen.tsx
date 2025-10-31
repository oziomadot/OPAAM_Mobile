import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Stack.Screen options={{ title: 'Test Screen' }} />
      <Text>Test Screen Content</Text>
    </View>
  );
}
