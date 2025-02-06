import { createTheme, MantineColorsTuple } from '@mantine/core';

type ThemeColors = {
  primary: string;
  secondary: string;
  tertiary: string;
};

const themeColors: ThemeColors = {
  primary: 'yellow',
  secondary: 'red',
  tertiary: 'pink',
};

type GradientDefinition = {
  from: string;
  to: string;
};

type ThemeGradients = {
  logo: GradientDefinition;
};

const themeGradients: ThemeGradients = {
  logo: {
    from: getComputedCssVariable(`--mantine-color-${themeColors.primary}-5`),
    to: getComputedCssVariable(`--mantine-color-${themeColors.tertiary}-5`),
  },
};

function getComputedCssVariable(variableName: string): string {
  // Get the computed value of a CSS variable
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

function colorNameToArray(name: string): string[] {
  return Array.from({ length: 10 }, (_, i) => {
    const variableName = `--mantine-color-${name}-${i}`;
    const computedValue = getComputedCssVariable(variableName);
    return computedValue;
  });
}

function tupleFromArray(arr: string[]): MantineColorsTuple {
  if (arr.length !== 10) {
    throw new Error('Array must have exactly 10 elements to convert to ColorTuple');
  }
  return [...arr] as unknown as MantineColorsTuple;
}

function createColorTuple(colorName: string): MantineColorsTuple {
  return tupleFromArray(colorNameToArray(colorName));
}

export const theme = createTheme({
  primaryColor: themeColors.primary,
  colors: {
    'primary': createColorTuple(themeColors.primary),
    'secondary': createColorTuple(themeColors.secondary),
    'tertiary': createColorTuple(themeColors.tertiary),
    'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});

export function getThemeColor(colorName: string = "primary", shade: number = 5): string {
  return getComputedCssVariable(`--mantine-color-${colorName}-${shade}`);
}

// Export the theme colors and gradients for use in other components
export { themeGradients };
