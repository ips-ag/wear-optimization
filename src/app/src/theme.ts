import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          green: {
            primary: { value: '#4b8232' },
            light: { value: '#E6F0E6' },
            40: { value: 'rgba(75, 130, 50, 0.4)' },
            70: { value: 'rgba(75, 130, 50, 0.7)' },
          },
          blue: {
            primary: { value: '#0069AA' },
            60: { value: 'rgba(0, 105, 170, 0.6)' },
            35: { value: 'rgba(0, 105, 170, 0.35)' },
          },
          yellow: {
            primary: { value: '#EBB300' },
            55: { value: 'rgba(235, 179, 0, 0.55)' },
            30: { value: 'rgba(235, 179, 0, 0.3)' },
          },
          red: {
            primary: { value: '#CF0000' },
            65: { value: 'rgba(207, 0, 0, 0.65)' },
            45: { value: 'rgba(207, 0, 0, 0.45)' },
          },
          grey: {
            1: { value: '#666666' },
            2: { value: '#808080' },
            4: { value: '#D9D9D9' },
            100: { value: 'rgba(102, 102, 102, 0.2)' },
            300: { value: '#999999' },
          },
        },
      },
    },
  },
});
