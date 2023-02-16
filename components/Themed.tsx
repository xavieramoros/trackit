/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Icon as DefaultIcon, Button as DefaultButton, ButtonProps as DefaultButtonProps, IconProps as DefaultIconProps } from 'react-native-elements';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type IconProps = ThemeProps & DefaultIconProps;
export type ButtonProps = ThemeProps & DefaultButtonProps;

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Button = (props: ButtonProps) => {
  const { lightColor, darkColor, ...otherProps } = props;
  const buttonBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackgroundColor');
  const buttonTitleColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonTitleColor');

  return <DefaultButton titleStyle={{ color: buttonTitleColor}} buttonStyle={{ backgroundColor: buttonBackgroundColor}} {...otherProps} />;
}

export const Icon = (props: IconProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useColorScheme();
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'iconColor');

  return <DefaultIcon 
    reverse={theme === 'dark'} reverseColor={iconColor} 
    {...otherProps} />;
}
