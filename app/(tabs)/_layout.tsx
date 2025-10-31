import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';


import { HapticTab } from '../components/HapticTab';
import { IconSymbol } from '../components/ui/IconSymbol';

import { useColorScheme } from '../../hooks/useColorScheme';

const LAST_VISITED_ROUTE_KEY = '@opaam_last_visited_route';

type TabBarIconProps = {
  color: string;
  size: number;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const currentColors = Colors[colorScheme] || Colors.light;
  const pathname = usePathname();
  // const { theme } = useTheme();

  // Save the current route whenever it changes
  useEffect(() => {
    const saveCurrentRoute = async () => {
      try {
        if (pathname) {
          // Remove '/index' from the path if it exists
          const cleanPathname = pathname.endsWith('/index') 
            ? pathname.replace(/\/index$/, '') 
            : pathname;
            
          await AsyncStorage.setItem(LAST_VISITED_ROUTE_KEY, cleanPathname);
        }
      } catch (error) {
        console.error('Error saving current route:', error);
      }
    };

    saveCurrentRoute();
  }, [pathname]);

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: currentColors.tabIconSelected,
        // tabBarInactiveTintColor: currentColors.tabIconDefault,
        headerShown: false,
        tabBarButton: (props) => <HapticTab {...props} />,
        tabBarStyle: {
          // backgroundColor: currentColors.background,
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.1)',
          ...Platform.select({
            ios: {
              position: 'absolute',
              borderTopWidth: 0,
            },
          }),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="screens/game"
        options={{
          title: 'Games',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="test-screen"
        options={{
          title: 'Test',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={size} name="flask" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
