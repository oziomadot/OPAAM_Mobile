import { Linking, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

type ExternalLinkProps = {
  href: string;
  style?: ViewStyle;
  children: React.ReactNode;
};

export function ExternalLink({ href, style, children }: ExternalLinkProps) {
  return (
    <TouchableOpacity
      style={[styles.link, style]}
      onPress={() => Linking.openURL(href)}
      activeOpacity={0.7}
    >
      <ThemedText type="link">{children}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    marginVertical: 4,
  },
});
