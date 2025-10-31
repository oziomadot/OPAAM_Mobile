# Install required npm packages
Write-Host "Installing npm dependencies..." -ForegroundColor Cyan

# Core React Native dependencies
Write-Host "Installing core navigation dependencies..." -ForegroundColor Yellow
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler

# UI Components
Write-Host "Installing UI components..." -ForegroundColor Yellow
npx expo install @expo/vector-icons react-native-vector-icons react-native-maps react-native-svg

# State Management and Data Fetching
Write-Host "Installing state management and data fetching..." -ForegroundColor Yellow
npx expo install @tanstack/react-query

# Forms and Validation
Write-Host "Installing form handling..." -ForegroundColor Yellow
npx expo install formik yup

# Security and Storage
Write-Host "Installing security and storage..." -ForegroundColor Yellow
npx expo install expo-secure-store

# Media Handling
Write-Host "Installing media handling..." -ForegroundColor Yellow
npx expo install expo-image-picker expo-file-system

# HTTP Client
Write-Host "Installing HTTP client..." -ForegroundColor Yellow
npx expo install axios

# Date/Time Handling
Write-Host "Installing date handling..." -ForegroundColor Yellow
npx expo install date-fns

# Development Dependencies
Write-Host "Installing development dependencies..." -ForegroundColor Yellow
npm install --save-dev @types/react @types/react-native @types/react-navigation @types/react-native-vector-icons

Write-Host "All dependencies installed successfully!" -ForegroundColor Green
Write-Host "Please run 'npx expo start' to start the development server." -ForegroundColor Cyan

Write-Host "Dependencies installed successfully!" -ForegroundColor Green
