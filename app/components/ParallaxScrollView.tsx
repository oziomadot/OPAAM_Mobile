import * as React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';

type ParallaxScrollViewProps = ScrollViewProps & {
  headerBackgroundColor: { light: string; dark: string };
  headerImage: React.ReactElement;
  headerText?: string;
};

export default function ParallaxScrollView({
  headerBackgroundColor,
  headerImage,
  children,
  style,
  ...rest
}: ParallaxScrollViewProps) {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      {...rest}
    >
      <ThemedView
        // style={[
        //   styles.header,
        //   {
        //     backgroundColor: headerBackgroundColor.light,
        //   },
        // ]}
      >
        {headerImage}
      </ThemedView>
      <ThemedView style={styles.content}>
        {children}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    height: 250,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
