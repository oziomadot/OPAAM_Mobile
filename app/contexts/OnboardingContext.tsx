import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = '@onboarding_completed';

interface OnboardingContextType {
  isFirstLaunch: boolean | null;
  isLoading: boolean;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setIsFirstLaunch(value === null);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsFirstLaunch(true);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      setIsFirstLaunch(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <OnboardingContext.Provider value={{ isFirstLaunch, isLoading, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingContext;