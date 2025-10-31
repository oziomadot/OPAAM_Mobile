import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useOnboarding } from './contexts/OnboardingContext';

export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();

  const handleGetStarted = async () => {
    try {
      await completeOnboarding();
      // Navigate to welcome screen
      router.replace({
        pathname: '/welcome',
        params: { fromOnboarding: 'true' }
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to OPAAM</Text>
      <Text style={styles.subtitle}>Your Personal Property Assistant</Text>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Discover amazing properties and manage your real estate investments all in one place.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  content: {
    marginBottom: 40,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
