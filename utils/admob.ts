import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob';

export const initializeAdMob = async () => {
  try {
    // Use test device ID for development
    const testDeviceID = 'EMULATOR';
    
    // Set test device ID for AdMob
    await setTestDeviceIDAsync(testDeviceID);
    
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize AdMob:', error);
  }
};

export const getBannerAdUnitId = () => {
  // Test banner ad unit ID
  return __DEV__ 
    ? 'ca-app-pub-3940256099942544/6300978111' // Test ID
    : 'YOUR_PRODUCTION_BANNER_AD_UNIT_ID'; // Replace with your production ID
};

export { AdMobBanner };
