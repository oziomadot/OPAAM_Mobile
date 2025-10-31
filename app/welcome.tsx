import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from 'react-native-paper';
import { useTheme } from "../contexts/ThemeContext";

const LAST_VISITED_ROUTE_KEY = '@opaam_last_visited_route';

type RootStackParamList = {
  '/(tabs)': undefined;
  '/(tabs)/index': undefined;
  '/(onboarding)': undefined;
  '/': undefined;
  // Add other routes here if needed
};

const { width } = Dimensions.get('window');

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, '/(tabs)'>;

const slides = [
  {
    id: '1',
    title: 'Find Your Dream Home',
    description: 'Discover the perfect property that matches your lifestyle and budget.',
    image: { uri: 'https://reactnative.dev/img/header_logo.svg' },
  },
  {
    id: '2',
    title: 'Virtual Tours',
    description: 'Take 3D virtual tours of properties from the comfort of your home.',
    image: { uri: 'https://reactnative.dev/img/header_logo.svg' },
  },
  {
    id: '3',
    title: 'Expert Agents',
    description: 'Connect with professional real estate agents to guide you through the process.',
    image: { uri: 'https://reactnative.dev/img/header_logo.svg' },
  },
  {
    id: '4', 
    title: 'Games',
    description: 'Play games, test your knowledge and win points that you can use to buy something.',
    image: { uri: 'https://reactnative.dev/img/header_logo.svg' },
  }
];

export default function WelcomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useTheme();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // // Check for initial route on mount
  useEffect(() => {
    const prepare = async () => {
      try {
        let savedRoute = await AsyncStorage.getItem(LAST_VISITED_ROUTE_KEY);
        if (savedRoute) {
          // Ensure the route is in the correct format
          if (savedRoute.endsWith('/index')) {
            savedRoute = savedRoute.replace(/\/index$/, '');
          }
          setInitialRoute(savedRoute);
        }
      } catch (error) {
        console.error('Error loading saved route:', error);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  // Handle initial navigation if needed
  useEffect(() => {
    if (isReady && initialRoute) {
      // Small delay to ensure UI is ready
      const timer = setTimeout(() => {
        // @ts-ignore - Workaround for Expo Router type issue
        router.replace(initialRoute);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReady, initialRoute]);

  const handleGetStarted = async () => {
    const targetRoute = '/(tabs)';
    try {
      // Ensure we're saving the clean path (without /index)
      const cleanRoute = targetRoute.endsWith('/index') 
        ? targetRoute.replace(/\/index$/, '')
        : targetRoute;
      
      await AsyncStorage.setItem(LAST_VISITED_ROUTE_KEY, cleanRoute);
      // @ts-ignore - Workaround for Expo Router type issue
      router.replace(cleanRoute);
    } catch (error) {
      console.error('Error saving last visited route:', error);
      // @ts-ignore - Workaround for Expo Router type issue
      router.replace(targetRoute);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * index, animated: true });
      setCurrentIndex(index);
    }
  };

  const handleMomentumScrollEnd = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? theme.colors.primary : theme.colors.border,
            },
          ]}
          onPress={() => scrollTo(index)}
        />
      ))}
    </View>
  );

  if (!isReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topContainer}>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleGetStarted}
          >
            <Text style={[styles.skipText, { color: theme.colors.primary }]}>
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <Image
              source={slide.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {slide.title}
            </Text>
            <Text style={[styles.description, { color: theme.colors.text }]}>
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {renderDots()}
        <View style={styles.buttonContainer}>
          {currentIndex === slides.length - 1 ? (
            <Button
              mode="contained"
              onPress={handleGetStarted}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Get Started
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < slides.length) {
                  scrollTo(nextIndex);
                }
              }}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={styles.buttonLabel}
            >
              Next
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flexGrow: 1,
  },
  slide: {
    width,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
