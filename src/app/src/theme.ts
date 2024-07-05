import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      green: {
        primary: '#4b8232',
        light: '#E6F0E6',
        40: 'rgba(75, 130, 50, 0.4)',
        70: 'rgba(75, 130, 50, 0.7)',
      },
      blue: {
        primary: '#0069AA',
        60: 'rgba(0, 105, 170, 0.6)',
        35: 'rgba(0, 105, 170, 0.35)',
      },
      yellow: {
        primary: '#EBB300',
        55: 'rgba(235, 179, 0, 0.55)',
        30: 'rgba(235, 179, 0, 0.3)',
      },
      red: {
        primary: '#CF0000',
        65: 'rgba(207, 0, 0, 0.65)',
        45: 'rgba(207, 0, 0, 0.45)',
      },
      grey: {
        1: '#666666',
        2: '#808080',
        4: '#D9D9D9',
        100: 'rgba(102, 102, 102, 0.2)',
        300: '#999999',
      },
    },
  },
});
