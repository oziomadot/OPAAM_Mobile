import { Redirect } from 'expo-router';
import { useOnboarding } from '../contexts/OnboardingContext';

export default function OnboardingIndex() {
  const { isFirstLaunch } = useOnboarding();
  
  if (isFirstLaunch === false) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/onboarding" />;
}
