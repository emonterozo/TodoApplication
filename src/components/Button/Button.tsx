import React from 'react';
import { Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';

export type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  testID: string;
  textColor?: string;
  buttonColor?: string;
  fontSize?: number;
  disabled?: boolean;
};

const Button = ({
  title,
  onPress,
  testID,
  textColor,
  buttonColor,
  fontSize,
  disabled,
}: ButtonProps) => {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[
        styles.buttonContainer,
        { backgroundColor: disabled ? 'gray' : buttonColor ?? '#EAB68F' },
      ]}
      disabled={disabled}
    >
      <Text style={{ color: textColor ?? 'black', fontSize: fontSize ?? 20 }}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 15,
  },
});

export default Button;
