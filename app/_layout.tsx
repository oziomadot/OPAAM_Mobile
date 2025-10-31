import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from "../contexts/ThemeContext";
import { OnboardingProvider, useOnboarding } from "./contexts/OnboardingContext";
import { initializeAdMob } from "../utils/admob";

// Initialize AdMob when the app starts
initializeAdMob().catch(console.error);

function RootLayout() {
  return (
    <ThemeProvider>
      <OnboardingProvider>
        <AppContent />
      </OnboardingProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isFirstLaunch, isLoading } = useOnboarding();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // wait until onboarding state is loaded

    const currentRoute = segments[0];
    const inOnboarding = currentRoute === 'onboarding';
    const inTabsGroup = currentRoute === '(tabs)';

    if (isFirstLaunch === null) return;

    // Delay navigation to the next tick
    setTimeout(() => {
      if (isFirstLaunch && !inOnboarding) {
        router.replace('/onboarding');
      } else if (!isFirstLaunch && !inTabsGroup && !inOnboarding) {
        router.replace('/(tabs)');
      }
    }, 0);
  }, [isFirstLaunch, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="property-details" />
        <Stack.Screen name="word-puzzle" />
        <Stack.Screen name="nigeria-quiz" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}

export default RootLayout;
