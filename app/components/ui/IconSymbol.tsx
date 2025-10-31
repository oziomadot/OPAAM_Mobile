import { ComponentProps } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function IconSymbol({ name, size = 24, color = '#007AFF', style, ...props }: IconSymbolProps) {
  return (
    <Text
      style={[
        {
          fontFamily: 'System',
          fontSize: size,
          lineHeight: size * 1.2,
          color,
        },
        style,
      ]}
      {...props}
    >
      {name}
    </Text>
  );
}

export default IconSymbol;
