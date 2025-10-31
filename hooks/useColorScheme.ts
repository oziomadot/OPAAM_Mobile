import { useColorScheme as _useColorScheme } from 'react-native';

// This hook is a simple wrapper around the built-in useColorScheme hook
export function useColorScheme() {
  return _useColorScheme() || 'light';
}
