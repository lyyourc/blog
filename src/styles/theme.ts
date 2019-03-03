export interface Theme {
  pallete: {
    primary: string[],
    gray: string[],
  },
  fontSizes: number[],
  space: number[],
}

export function createTheme(): Theme {
  return {
    pallete: {
      primary: ['#ff5a5f'],
      gray: ['#484848'],
    },
    fontSizes: [
      12, 14, 16, 24, 32, 48, 64, 96, 128
    ],
    space: [
      // margin and padding
      0, 4, 8, 16, 32, 64, 128, 256
    ],
  }
}
