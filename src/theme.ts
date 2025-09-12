export const themeColors = {
  primary: '#fbbf24', // yellow-400
  secondary: '#ef4444', // red-500
  tertiary: '#ec4899', // pink-500
};

export const themeGradients = {
  logo: {
    from: themeColors.primary,
    to: themeColors.tertiary,
  },
};

export function getThemeColor(colorName: keyof typeof themeColors = 'primary'): string {
  return themeColors[colorName];
}
