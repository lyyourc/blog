export interface Theme {
  pallete: {
    primary: string[],
    teal: string[],
    gray: string[],
  },
  fontSizes: number[],
  space: number[],
}

export function createTheme(): Theme {
  return {
    pallete: {
      primary: ['#ff5a5f'],
      teal: ['#008489'],
      gray: ['#f3f4f4'],
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
