#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Install core navigation dependencies
echo "Installing navigation dependencies..."
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler

# Install UI components
echo "Installing UI components..."
npx expo install @expo/vector-icons react-native-vector-icons react-native-maps react-native-svg

# Install state management and data fetching
echo "Installing state management and data fetching..."
npx expo install @tanstack/react-query

# Install form handling
echo "Installing form handling..."
npx expo install formik yup

# Install security and storage
echo "Installing security and storage..."
npx expo install expo-secure-store

# Install media handling
echo "Installing media handling..."
npx expo install expo-image-picker expo-file-system

# Install HTTP client
echo "Installing HTTP client..."
npx expo install axios

# Install date handling
echo "Installing date handling..."
npx expo install date-fns

# Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev @types/react @types/react-native @types/react-navigation @types/react-native-vector-icons

echo "All dependencies installed successfully!"
echo "Please run 'npx expo start' to start the development server."
