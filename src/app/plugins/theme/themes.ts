// filepath: /src/app/plugins/theme/themes.ts
export type ThemeName = 'default' | 'apuestasroyal' | 'juegaycobra';

// CSS variable names we touch
export type ThemeVars = Record<string, string>;

// Helper to build tone vars
const toneVars = (prefix: 'primary' | 'secondary' | 'tertiary', tones: Record<number, string>) => {
  const entries: Record<string, string> = {};
  Object.entries(tones).forEach(([k, v]) => {
    entries[`--app-${prefix}-${k}`] = v;
  });
  return entries;
};

// ApuestasRoyal (actual)
const apuestasroyalBase: ThemeVars = {
  '--app-primary': '#401d6c',
  '--app-secondary': '#95D23D',
  '--app-tertiary': '#120d3c',
  '--app-danger': '#f04438',
  '--app-info': '#2e90fa',
  '--app-warning': '#f79009',
  '--app-success': '#12b76A',
  '--app-input': 'rgba(60, 108, 217, 0.23)',
  '--app-tertiary-opacity': 'rgba(241, 245, 249, 0.16)',
  '--app-background-opacity': 'rgba(5, 25, 35, 0.05)',
};

const apuestasroyalTones: ThemeVars = {
  ...toneVars('primary', {
    50: '#f7f4fe',
    100: '#f0ebfc',
    200: '#e3dafa',
    300: '#cdbcf6',
    400: '#b596ef',
    500: '#9c6ce6',
    600: '#8e4cdb',
    700: '#7e3ac7',
    800: '#6930a7',
    900: '#582989',
    950: '#401d6c',
  }),
  ...toneVars('secondary', {
    50: '#f5fce9',
    100: '#e9f7d0',
    200: '#d4f0a6',
    300: '#b6e472',
    400: '#95D23D',
    500: '#7bba28',
    600: '#5e941c',
    700: '#48711a',
    800: '#3c5a1a',
    900: '#334d1a',
    950: '#192a09',
  }),
  ...toneVars('tertiary', {
    50: '#eaefff',
    100: '#d9e1ff',
    200: '#bac6ff',
    300: '#91a0ff',
    400: '#656cff',
    500: '#4942ff',
    600: '#3b21ff',
    700: '#3316ec',
    800: '#2915be',
    900: '#261b94',
    950: '#120d3c',
  }),
};

// JuegaYCobra - paleta oficial proporcionada
const juegaycobraBase: ThemeVars = {
  '--app-primary': '#3E3E3E',
  '--app-secondary': '#FE9400',
  '--app-tertiary': '#FECB00',
  '--app-background': '#161616',
  '--app-danger': '#f21e3f',
  '--app-info': '#2ecafa',
  '--app-warning': '#fe4000',
  '--app-success': '#2dd367',
  '--app-input': 'rgba(254, 148, 0, 0.23)',
  '--app-tertiary-opacity': 'rgba(255, 255, 255, 0.12)',
  '--app-background-opacity': 'rgba(255, 255, 255, 0.10)',
};

const juegaycobraTones: ThemeVars = {
  ...toneVars('primary', {
    100: '#f9f9f9',
    200: '#f2f2f2',
    300: '#ebebeb',
    400: '#696868',
    500: '#3E3E3E',
    600: '#333333',
    700: '#2d2d2d',
    800: '#272727',
    900: '#212121',
  }),
  ...toneVars('secondary', {
    100: '#f9e8d1',
    200: '#f4d8a3',
    300: '#f0c775',
    400: '#ecb64a',
    500: '#FE9400',
    600: '#e08e1e',
    700: '#c97a1b',
    800: '#b36619',
    900: '#a05a18',
  }),
  ...toneVars('tertiary', {
    100: '#f9e8d1',
    200: '#f4d8a3',
    300: '#f0c775',
    400: '#ecb64a',
    500: '#FECB00',
    600: '#e08e1e',
    700: '#c97a1b',
    800: '#b36619',
  }),
};

export const THEMES: Record<ThemeName, ThemeVars> = {
  default: { ...apuestasroyalBase, ...apuestasroyalTones },
  apuestasroyal: { ...apuestasroyalBase, ...apuestasroyalTones },
  juegaycobra: { ...juegaycobraBase, ...juegaycobraTones },
};
